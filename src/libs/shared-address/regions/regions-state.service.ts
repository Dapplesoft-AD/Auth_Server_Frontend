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
import { Region } from './regions.model'
import { RegionApiService } from './regions-api.service'

@Injectable({
    providedIn: 'root',
})
export class RegionStateService {
    private regionApiService = inject(RegionApiService)

    private reloadTrigger = new BehaviorSubject<void>(undefined)
    private loadingSubject = new BehaviorSubject<boolean>(false)
    private errorSubject = new BehaviorSubject<boolean>(false)

    loading$ = this.loadingSubject.asObservable()
    error$ = this.errorSubject.asObservable()

    region$ = this.reloadTrigger.pipe(
        tap(() => this.startLoading()),
        switchMap(() =>
            this.regionApiService.getRegions().pipe(
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

    loadRegion() {
        this.reload()
    }

    reload() {
        this.reloadTrigger.next()
    }
    createRegion(data: Partial<Region>): Observable<Region> {
        this.startLoading()
        return this.regionApiService.createRegions(data as Region).pipe(
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

    updateCountry(
        id: string,
        updatedData: Partial<Region>,
    ): Observable<Region> {
        this.startLoading()
        return this.regionApiService.updateRegions(id, updatedData).pipe(
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

    deleteRegion(id: string): Observable<void> {
        this.startLoading()
        return this.regionApiService.deleteRegions(id).pipe(
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
