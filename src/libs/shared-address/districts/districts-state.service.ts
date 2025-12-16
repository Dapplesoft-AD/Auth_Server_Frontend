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
import { District } from './districts.model'
import { DistrictApiService } from './districts-api.service'

export type DistrictState = {
    districts: District[]
    loading: boolean
    error: boolean
    search: string
    page: number
    size: number
}

const initialDistrictState: DistrictState = {
    districts: [],
    loading: false,
    error: false,
    search: '',
    page: 1,
    size: 10,
}

@Injectable()
export class DistrictListStateService extends SimpleStore<DistrictState> {
    private districtApiService = inject(DistrictApiService)

    constructor() {
        super(initialDistrictState)
    }

    init() {
        this.loadDistricts()
    }

    private loadDistricts() {
        combineLatest([
            this.select('search'),
            this.select('page'),
            this.select('size'),
        ])
            .pipe(
                debounceTime(300),
                tap(() => this.setState({ loading: true, error: false })),
                switchMap(([search, page, size]) =>
                    this.districtApiService.findAllDistricts({
                        search,
                        page,
                        size,
                    }),
                ),
            )
            .subscribe({
                next: (districts) =>
                    this.setState({ districts, loading: false }),
                error: () => this.setState({ error: true, loading: false }),
            })
    }

    createDistrict(district: District) {
        this.setState({ loading: true, error: false })
        return this.districtApiService.createDistrict(district).pipe(
            tap((newDistrict) => this.pushDistrict(newDistrict)),
            catchError(() => {
                this.setState({ error: true })
                return throwError(() => new Error('Failed to create district'))
            }),
            finalize(() => this.setState({ loading: false })),
        )
    }

    updateDistrict(id: string, district: District) {
        this.setState({ loading: true, error: false })
        return this.districtApiService.updateDistrict(id, district).pipe(
            tap((updatedDistrict) => this.replaceDistrict(updatedDistrict)),
            catchError(() => {
                this.setState({ error: true })
                return throwError(() => new Error('Failed to update district'))
            }),
            finalize(() => this.setState({ loading: false })),
        )
    }

    deleteDistrict(id: string) {
        this.setState({ loading: true, error: false })
        return this.districtApiService.deleteDistrict(id).pipe(
            tap(() => this.removeDistrictFromState(id)),
            catchError(() => {
                this.setState({ error: true })
                return throwError(() => new Error('Failed to delete district'))
            }),
            finalize(() => this.setState({ loading: false })),
        )
    }

    private pushDistrict(district: District) {
        this.setState({ districts: [district, ...this.getState().districts] })
    }

    private replaceDistrict(district: District) {
        this.setState({
            districts: this.getState().districts.map((d) =>
                d.id === district.id ? district : d,
            ),
        })
    }

    private removeDistrictFromState(id: string) {
        this.setState({
            districts: this.getState().districts.filter((d) => d.id !== id),
        })
    }
}
