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
import { Area } from './areas.model'
import { AreaApiService } from './areas-api.service'

export type AreaState = {
    areas: Area[]
    loading: boolean
    error: boolean
    search: string
    page: number
    size: number
}

const initialAreaState: AreaState = {
    areas: [],
    loading: false,
    error: false,
    search: '',
    page: 1,
    size: 10,
}

@Injectable({
    providedIn: 'root',
})
export class AreaListStateService extends SimpleStore<AreaState> {
    private areaApiService = inject(AreaApiService)

    constructor() {
        super(initialAreaState)
    }

    init() {
        this.loadAreas()
    }

    private loadAreas() {
        combineLatest([
            this.select('search'),
            this.select('page'),
            this.select('size'),
        ])
            .pipe(
                debounceTime(300),
                tap(() => this.setState({ loading: true, error: false })),
                switchMap(([search, page, size]) =>
                    this.areaApiService.findAllAreas({
                        search,
                        page,
                        size,
                    }),
                ),
            )
            .subscribe({
                next: (areas) => {
                    console.log('Log data :', areas)
                    this.setState({ areas, loading: false })
                },
                error: () => {
                    this.setState({ error: true, loading: false })
                },
            })
    }

    createArea(area: Area) {
        this.setState({ loading: true, error: false })
        return this.areaApiService.createArea(area).pipe(
            tap((area) => this.pushArea(area)),
            catchError(() => {
                this.setState({ error: true })
                return throwError(() => new Error('Failed to create area'))
            }),
            finalize(() => this.setState({ loading: false })),
        )
    }

    updateArea(id: string, area: Area) {
        this.setState({ loading: true, error: false })
        return this.areaApiService.updateArea(id, area).pipe(
            tap((area) => this.replaceArea(area)),
            catchError(() => {
                this.setState({ error: true })
                return throwError(() => new Error('Failed to update area'))
            }),
            finalize(() => this.setState({ loading: false })),
        )
    }

    deleteArea(id: string) {
        this.setState({ loading: true, error: false })
        return this.areaApiService.deleteArea(id).pipe(
            tap(() => this.removeAreaFromState(id)),
            catchError(() => {
                this.setState({ error: true })
                return throwError(() => new Error('Failed to delete area'))
            }),
            finalize(() => this.setState({ loading: false })),
        )
    }

    private pushArea(area: Area) {
        this.setState({
            areas: [area, ...this.getState().areas],
        })
    }

    private replaceArea(area: Area) {
        this.setState({
            areas: this.getState().areas.map((a) =>
                a.id === area.id ? area : a,
            ),
        })
    }

    private removeAreaFromState(id: string) {
        this.setState({
            areas: this.getState().areas.filter((a) => a.id !== id),
        })
    }
}
