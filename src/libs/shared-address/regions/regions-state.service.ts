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
import { Region, RegionDto } from './regions.model'
import { RegionApiService } from './regions-api.service'

export type RegionState = {
    regions: Region[]
    loading: boolean
    error: boolean
    search: string
    page: number
    size: number
}

const initialRegionState: RegionState = {
    regions: [],
    loading: false,
    error: false,
    search: '',
    page: 1,
    size: 10,
}

@Injectable()
export class RegionListStateService extends SimpleStore<RegionState> {
    private regionApiService = inject(RegionApiService)

    constructor() {
        super(initialRegionState)
    }

    init() {
        this.loadRegions()
    }

    private loadRegions() {
        combineLatest([
            this.select('search'),
            this.select('page'),
            this.select('size'),
        ])
            .pipe(
                debounceTime(300),
                tap(() => this.setState({ loading: true, error: false })),
                switchMap(() => this.regionApiService.findAllRegions()),
            )
            .subscribe({
                next: (regions) => {
                    this.setState({ regions, loading: false })
                },
                error: () => {
                    this.setState({ error: true, loading: false })
                },
            })
    }

    createRegion(region: RegionDto) {
        this.setState({ loading: true, error: false })

        return this.regionApiService.createRegion(region as Region).pipe(
            tap((created) => this.pushRegion(created)),
            catchError(() => {
                this.setState({ error: true })
                return throwError(() => new Error('Failed to create region'))
            }),
            finalize(() => this.setState({ loading: false })),
        )
    }

    updateRegion(id: string, region: RegionDto) {
        this.setState({ loading: true, error: false })

        return this.regionApiService.updateRegion(id, region).pipe(
            tap((updated) => this.replaceRegion(updated)),
            catchError(() => {
                this.setState({ error: true })
                return throwError(() => new Error('Failed to update region'))
            }),
            finalize(() => this.setState({ loading: false })),
        )
    }

    deleteRegion(id: string) {
        this.setState({ loading: true, error: false })

        return this.regionApiService.deleteRegion(id).pipe(
            tap(() => this.removeRegion(id)),
            catchError(() => {
                this.setState({ error: true })
                return throwError(() => new Error('Failed to delete region'))
            }),
            finalize(() => this.setState({ loading: false })),
        )
    }

    private pushRegion(region: Region) {
        this.setState({
            regions: [region, ...this.getState().regions],
        })
    }

    private replaceRegion(region: Region) {
        this.setState({
            regions: this.getState().regions.map((r) =>
                r.id === region.id ? region : r,
            ),
        })
    }

    private removeRegion(id: string) {
        this.setState({
            regions: this.getState().regions.filter((r) => r.id !== id),
        })
    }
}
