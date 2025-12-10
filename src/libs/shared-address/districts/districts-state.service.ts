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
import { District } from './districts.model'
import { DistrictApiService } from './districts-api.service'

@Injectable({
    providedIn: 'root',
})
export class DistrictStateService {
    private districtApiService = inject(DistrictApiService)

    private reloadTrigger = new BehaviorSubject<void>(undefined)
    private loadingSubject = new BehaviorSubject<boolean>(false)
    private errorSubject = new BehaviorSubject<boolean>(false)

    loading$ = this.loadingSubject.asObservable()
    error$ = this.errorSubject.asObservable()

    district$ = this.reloadTrigger.pipe(
        tap(() => this.startLoading()),
        switchMap(() =>
            this.districtApiService.getDistricts().pipe(
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

    loadDistrict() {
        this.reload()
    }

    reload() {
        this.reloadTrigger.next()
    }
    createDistrict(data: Partial<District>): Observable<District> {
        this.startLoading()
        return this.districtApiService.createDistricts(data as District).pipe(
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
        updatedData: Partial<District>,
    ): Observable<District> {
        this.startLoading()
        return this.districtApiService.updateDistricts(id, updatedData).pipe(
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

    deleteDistrict(id: string): Observable<void> {
        this.startLoading()
        return this.districtApiService.deleteDistricts(id).pipe(
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
