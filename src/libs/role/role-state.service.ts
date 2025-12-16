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
import { Role, RoleDto } from './role.model'
import { RoleApiService } from './role-api.service'

export type RoleState = {
    roles: Role[]
    loading: boolean
    error: boolean
    search: string
    page: number
    size: number
}

const initialRoleState: RoleState = {
    roles: [],
    loading: false,
    error: false,
    search: '',
    page: 1,
    size: 10,
}

@Injectable()
export class RoleListStateService extends SimpleStore<RoleState> {
    private roleApiService = inject(RoleApiService)

    constructor() {
        super(initialRoleState)
    }

    init() {
        this.loadRoles()
    }

    private loadRoles() {
        combineLatest([
            this.select('search'),
            this.select('page'),
            this.select('size'),
        ])
            .pipe(
                debounceTime(300),
                tap(() => this.setState({ loading: true, error: false })),
                switchMap(([search, page, size]) =>
                    this.roleApiService.findAllRoles({
                        search,
                        page,
                        size,
                    }),
                ),
            )
            .subscribe({
                next: (roles) => {
                    this.setState({ roles, loading: false })
                },
                error: () => {
                    this.setState({ error: true, loading: false })
                },
            })
    }

    createRole(role: RoleDto) {
        this.setState({ loading: true, error: false })
        return this.roleApiService.createRole(role).pipe(
            tap((role) => this.pushRole(role)),
            catchError(() => {
                this.setState({ error: true })
                return throwError(() => new Error('Failed to create role'))
            }),
            finalize(() => this.setState({ loading: false })),
        )
    }

    updateRole(id: string, role: RoleDto) {
        this.setState({ loading: true, error: false })
        return this.roleApiService.updateRole(id, role).pipe(
            tap((role) => this.replaceRole(role)),
            catchError(() => {
                this.setState({ error: true })
                return throwError(() => new Error('Failed to update role'))
            }),
            finalize(() => this.setState({ loading: false })),
        )
    }

    deleteRole(id: string) {
        this.setState({ loading: true, error: false })
        return this.roleApiService.deleteRole(id).pipe(
            tap(() => this.removeRoleFromState(id)),
            catchError(() => {
                this.setState({ error: true })
                return throwError(() => new Error('Failed to delete role'))
            }),
            finalize(() => this.setState({ loading: false })),
        )
    }

    private pushRole(role: Role) {
        this.setState({
            roles: [role, ...this.getState().roles],
        })
    }

    private replaceRole(role: Role) {
        this.setState({
            roles: this.getState().roles.map((r) =>
                r.id === role.id ? role : r,
            ),
        })
    }

    private removeRoleFromState(id: string) {
        this.setState({
            roles: this.getState().roles.filter((r) => r.id !== id),
        })
    }
}
