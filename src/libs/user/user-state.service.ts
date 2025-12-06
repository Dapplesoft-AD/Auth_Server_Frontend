import { Injectable, inject } from '@angular/core'
import {
    BehaviorSubject,
    catchError,
    Observable,
    shareReplay,
    switchMap,
    tap,
    throwError,
} from 'rxjs'
import { User } from './user.model'
import { UserApiService } from './user-api.service'

@Injectable({
    providedIn: 'root',
})
export class UserStateService {
    private userApiService = inject(UserApiService)
    private reloadTrigger = new BehaviorSubject<void>(undefined)
    private loadingSubject = new BehaviorSubject<boolean>(false)
    private errorSubject = new BehaviorSubject<boolean>(false)

    loading$ = this.loadingSubject.asObservable()
    error$ = this.errorSubject.asObservable()

    users$ = this.reloadTrigger.pipe(
        tap(() => {
            this.loadingSubject.next(true)
            this.errorSubject.next(false)
        }),
        switchMap(() =>
            this.userApiService.getUsers().pipe(
                tap(() => this.loadingSubject.next(false)),
                catchError((err) => {
                    this.loadingSubject.next(false)
                    this.errorSubject.next(true)
                    return throwError(() => err)
                }),
            ),
        ),
        shareReplay({ bufferSize: 1, refCount: true }),
    )

    // fun
    private startLoading() {
        this.loadingSubject.next(true)
        this.errorSubject.next(false)
    }

    private stopLoadingWithError() {
        this.loadingSubject.next(false)
        this.errorSubject.next(true)
    }

    private stopLoading() {
        this.loadingSubject.next(false)
    }

    // ---State > Data---
    loadUsers() {
        this.reload()
    }

    reload() {
        this.reloadTrigger.next()
    }

    addUser(user: User): Observable<User> {
        this.startLoading()

        return this.userApiService.createUser(user).pipe(
            tap(() => {
                this.stopLoading()
                this.reload()
            }),
            catchError((err) => {
                this.stopLoadingWithError()
                return throwError(() => err)
            }),
        )
    }

    updateUser(id: string, user: Partial<User>): Observable<User> {
        this.startLoading()

        return this.userApiService.updateUser({ id, ...user }).pipe(
            tap(() => {
                this.stopLoading()
                this.reload()
            }),
            catchError((err) => {
                this.stopLoadingWithError()
                return throwError(() => err)
            }),
        )
    }

    deleteUser(user: User): Observable<void> {
        this.startLoading()

        return this.userApiService.deleteUser(user.id).pipe(
            tap(() => {
                this.stopLoading()
                this.reload()
            }),
            catchError((err) => {
                this.stopLoadingWithError()
                return throwError(() => err)
            }),
        )
    }
}
