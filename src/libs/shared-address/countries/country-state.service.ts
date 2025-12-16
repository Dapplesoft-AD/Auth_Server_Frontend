import { Injectable, inject } from '@angular/core'
import {
    catchError,
    combineLatest,
    debounceTime,
    finalize,
    switchMap,
    tap,
    throwError,
} from 'rxjs'
import { SimpleStore } from '../../store'
import { Country } from './country.model'
import { CountryApiService } from './country-api.service'

export type CountryState = {
    countries: Country[]
    loading: boolean
    error: boolean
    search: string
    page: number
    size: number
}

const initialCountryState: CountryState = {
    countries: [],
    loading: false,
    error: false,
    search: '',
    page: 1,
    size: 10,
}

@Injectable()
export class CountryListStateService extends SimpleStore<CountryState> {
    private countryApiService = inject(CountryApiService)

    constructor() {
        super(initialCountryState)
    }

    init() {
        this.loadCountries()
    }

    private loadCountries() {
        combineLatest([
            this.select('search'),
            this.select('page'),
            this.select('size'),
        ])
            .pipe(
                debounceTime(300),
                tap(() => this.setState({ loading: true, error: false })),
                switchMap(([search, page, size]) =>
                    this.countryApiService.findAllCountries({
                        search,
                        page,
                        size,
                    }),
                ),
            )
            .subscribe({
                next: (countries) =>
                    this.setState({ countries, loading: false }),
                error: () => this.setState({ error: true, loading: false }),
            })
    }

    createCountry(country: Country) {
        this.setState({ loading: true, error: false })
        return this.countryApiService.createCountry(country).pipe(
            tap((newCountry) => this.pushCountry(newCountry)),
            catchError(() => {
                this.setState({ error: true })
                return throwError(() => new Error('Failed to create country'))
            }),
            finalize(() => this.setState({ loading: false })),
        )
    }

    updateCountry(id: string, country: Country) {
        this.setState({ loading: true, error: false })
        return this.countryApiService.updateCountry(id, country).pipe(
            tap((updatedCountry) => this.replaceCountry(updatedCountry)),
            catchError(() => {
                this.setState({ error: true })
                return throwError(() => new Error('Failed to update country'))
            }),
            finalize(() => this.setState({ loading: false })),
        )
    }

    deleteCountry(id: string) {
        this.setState({ loading: true, error: false })
        return this.countryApiService.deleteCountry(id).pipe(
            tap(() => this.removeCountryFromState(id)),
            catchError(() => {
                this.setState({ error: true })
                return throwError(() => new Error('Failed to delete country'))
            }),
            finalize(() => this.setState({ loading: false })),
        )
    }

    private pushCountry(country: Country) {
        this.setState({ countries: [country, ...this.getState().countries] })
    }

    private replaceCountry(country: Country) {
        this.setState({
            countries: this.getState().countries.map((c) =>
                c.id === country.id ? country : c,
            ),
        })
    }

    private removeCountryFromState(id: string) {
        this.setState({
            countries: this.getState().countries.filter((c) => c.id !== id),
        })
    }
}
