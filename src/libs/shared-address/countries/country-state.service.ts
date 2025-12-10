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
import { Country } from './country.model'
import { CountryApiService } from './country-api.service'

@Injectable({
    providedIn: 'root',
})
export class CountryStateService {
    private countryApiService = inject(CountryApiService)

    private reloadTrigger = new BehaviorSubject<void>(undefined)
    private loadingSubject = new BehaviorSubject<boolean>(false)
    private errorSubject = new BehaviorSubject<boolean>(false)

    loading$ = this.loadingSubject.asObservable()
    error$ = this.errorSubject.asObservable()

    country$ = this.reloadTrigger.pipe(
        tap(() => this.startLoading()),
        switchMap(() =>
            this.countryApiService.getCountries().pipe(
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

    loadCountry() {
        this.reload()
    }

    reload() {
        this.reloadTrigger.next()
    }
    createCountry(data: Partial<Country>): Observable<Country> {
        this.startLoading()
        return this.countryApiService.createCountries(data as Country).pipe(
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
        updatedData: Partial<Country>,
    ): Observable<Country> {
        this.startLoading()
        return this.countryApiService.updateCountries(id, updatedData).pipe(
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

    deleteCountry(id: string): Observable<void> {
        this.startLoading()
        return this.countryApiService.deleteCountries(String(id)).pipe(
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
