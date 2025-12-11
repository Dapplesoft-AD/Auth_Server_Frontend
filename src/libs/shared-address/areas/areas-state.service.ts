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
import { Area } from './areas.model'
import { AreaApiService } from './areas-api.service'

@Injectable({
    providedIn: 'root',
})
export class AreaStateService {
    private areaApiService = inject(AreaApiService)

    private reloadTrigger = new BehaviorSubject<void>(undefined)
    private loadingSubject = new BehaviorSubject<boolean>(false)
    private errorSubject = new BehaviorSubject<boolean>(false)

    loading$ = this.loadingSubject.asObservable()
    error$ = this.errorSubject.asObservable()

    area$ = this.reloadTrigger.pipe(
        tap(() => this.startLoading()),
        switchMap(() =>
            this.areaApiService.getAreas().pipe(
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

    loadArea() {
        this.reload()
    }

    reload() {
        this.reloadTrigger.next()
    }
    createArea(data: Partial<Area>): Observable<Area> {
        this.startLoading()
        return this.areaApiService.createAreas(data as Area).pipe(
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

    updateArea(id: string, updatedData: Partial<Area>): Observable<Area> {
        this.startLoading()
        return this.areaApiService.updateAreas(id, updatedData).pipe(
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

    deleteArea(id: string): Observable<void> {
        this.startLoading()
        return this.areaApiService.deleteAreas(id).pipe(
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
