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
import { Role } from './role.model'
import { RoleApiService } from './role-api.service'

@Injectable({
    providedIn: 'root',
})
export class RoleStateService {
    private roleApiService = inject(RoleApiService)

    private reloadTrigger = new BehaviorSubject<void>(undefined)
    private loadingSubject = new BehaviorSubject<boolean>(false)
    private errorSubject = new BehaviorSubject<boolean>(false)

    loading$ = this.loadingSubject.asObservable()
    error$ = this.errorSubject.asObservable()

    roles$ = this.reloadTrigger.pipe(
        tap(() => this.startLoading()),
        switchMap(() =>
            this.roleApiService.getRoles().pipe(
                tap(() => this.stopLoading()),
                catchError((err) => {
                    this.stopLoadingWithError()
                    return throwError(() => err)
                }),
            ),
        ),
        shareReplay({ bufferSize: 1, refCount: true }),
    )

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

    loadRoles() {
        this.reload()
    }

    reload() {
        this.reloadTrigger.next()
    }

    createRole(role: Partial<Role>): Observable<Role> {
        this.startLoading()
        return this.roleApiService.createRole(role).pipe(
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

    updateRole(id: string, updatedData: Partial<Role>): Observable<Role> {
        this.startLoading()
        return this.roleApiService.updateRole(id, updatedData).pipe(
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

    deleteRole(id: string): Observable<void> {
        this.startLoading()
        return this.roleApiService.deleteRole(String(id)).pipe(
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
