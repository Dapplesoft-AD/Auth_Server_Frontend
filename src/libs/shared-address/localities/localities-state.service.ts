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
import { Localitie } from './localities.model'
import { LocalitieApiService } from './localities-api.service'

export type LocalitieState = {
    localities: Localitie[]
    loading: boolean
    error: boolean
    search: string
    page: number
    size: number
}

const initialLocalitieState: LocalitieState = {
    localities: [],
    loading: false,
    error: false,
    search: '',
    page: 1,
    size: 10,
}

@Injectable()
export class LocalitieListStateService extends SimpleStore<LocalitieState> {
    private localitieApiService = inject(LocalitieApiService)

    constructor() {
        super(initialLocalitieState)
    }

    init() {
        this.loadLocalities()
    }

    private loadLocalities() {
        combineLatest([
            this.select('search'),
            this.select('page'),
            this.select('size'),
        ])
            .pipe(
                debounceTime(300),
                tap(() => this.setState({ loading: true, error: false })),
                switchMap(
                    ([search, page, size]) =>
                        this.localitieApiService.findAllLocalities(), // you can add query params if API supports
                ),
            )
            .subscribe({
                next: (localities) =>
                    this.setState({ localities, loading: false }),
                error: () => this.setState({ error: true, loading: false }),
            })
    }

    createLocalitie(localitie: Localitie) {
        this.setState({ loading: true, error: false })
        return this.localitieApiService.createLocalitie(localitie).pipe(
            tap((newLocalitie) => this.pushLocalitie(newLocalitie)),
            catchError(() => {
                this.setState({ error: true })
                return throwError(() => new Error('Failed to create localitie'))
            }),
            finalize(() => this.setState({ loading: false })),
        )
    }

    updateLocalitie(id: string, localitie: Localitie) {
        this.setState({ loading: true, error: false })
        return this.localitieApiService.updateLocalitie(id, localitie).pipe(
            tap((updatedLocalitie) => this.replaceLocalitie(updatedLocalitie)),
            catchError(() => {
                this.setState({ error: true })
                return throwError(() => new Error('Failed to update localitie'))
            }),
            finalize(() => this.setState({ loading: false })),
        )
    }

    deleteLocalitie(id: string) {
        this.setState({ loading: true, error: false })
        return this.localitieApiService.deleteLocalitie(id).pipe(
            tap(() => this.removeLocalitieFromState(id)),
            catchError(() => {
                this.setState({ error: true })
                return throwError(() => new Error('Failed to delete localitie'))
            }),
            finalize(() => this.setState({ loading: false })),
        )
    }

    private pushLocalitie(localitie: Localitie) {
        this.setState({
            localities: [localitie, ...this.getState().localities],
        })
    }

    private replaceLocalitie(localitie: Localitie) {
        this.setState({
            localities: this.getState().localities.map((l) =>
                l.id === localitie.id ? localitie : l,
            ),
        })
    }

    private removeLocalitieFromState(id: string) {
        this.setState({
            localities: this.getState().localities.filter((l) => l.id !== id),
        })
    }
}
