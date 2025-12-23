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
import { SimpleStore } from '../store'
import { Token, TokenDto } from './token.model'
import { TokenApiService } from './token-api.service'

export type TokenState = {
    tokens: Token[]
    selectedTokens: Token[]
    loading: boolean
    error: boolean
    search: string
    page: number
    size: number
}

const initialTokenState: TokenState = {
    tokens: [],
    selectedTokens: [],
    loading: false,
    error: false,
    search: '',
    page: 1,
    size: 10,
}

@Injectable()
export class TokenListStateService extends SimpleStore<TokenState> {
    private tokenApiService = inject(TokenApiService)

    constructor() {
        super(initialTokenState)
    }

    init() {
        this.loadApplications()
    }

    private loadApplications() {
        combineLatest([
            this.select('search'),
            this.select('page'),
            this.select('size'),
        ])
            .pipe(
                debounceTime(300),
                tap(() => this.setState({ loading: true, error: false })),
                switchMap(([search, page, size]) =>
                    this.tokenApiService.findAllTokens({}),
                ),
            )
            .subscribe({
                next: (tokens) => {
                    this.setState({ tokens, loading: false })
                },
                error: () => {
                    this.setState({ error: true, loading: false })
                },
            })
    }

    createApplication(token: TokenDto) {
        this.setState({ loading: true, error: false })
        return this.tokenApiService.createToken(token).pipe(
            tap((token) => this.pushApplication(token)),
            catchError(() => {
                this.setState({ error: true })
                return throwError(() => new Error('Failed to create project'))
            }),
            finalize(() => this.setState({ loading: false })),
        )
    }

    updateApplication(id: string, token: TokenDto) {
        this.setState({ loading: true, error: false })
        return this.tokenApiService.updateToken(id, token).pipe(
            tap((token) => this.replaceApplication(token)),
            catchError(() => {
                this.setState({ error: true })
                return throwError(() => new Error('Failed to update project'))
            }),
            finalize(() => this.setState({ loading: false })),
        )
    }

    deleteApplication(id: string) {
        this.setState({ loading: true, error: false })
        return this.tokenApiService.deleteToken(id).pipe(
            tap(() => this.removeApplicationFromState(id)),
            catchError(() => {
                this.setState({ error: true })
                return throwError(() => new Error('Failed to delete project'))
            }),
            finalize(() => this.setState({ loading: false })),
        )
    }

    private pushApplication(token: Token) {
        this.setState({
            tokens: [token, ...this.getState().tokens],
        })
    }

    private replaceApplication(token: Token) {
        this.setState({
            tokens: this.getState().tokens.map((a) =>
                a.id === token.id ? token : a,
            ),
        })
    }

    private removeApplicationFromState(id: string) {
        this.setState({
            tokens: this.getState().tokens.filter((a) => a.id !== id),
        })
    }

    setSelectedUsers(apps: Token[]) {
        this.setState({ selectedTokens: [...apps] })
    }
}
