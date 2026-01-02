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
import { Application, ApplicationDto } from './application.model'
import { ApplicationApiService } from './application-api.service'

export type ApplicationState = {
    applications: Application[]
    selectedApps: Application[]
    loading: boolean
    error: boolean
    search: string
    page: number
    size: number
}

const initialApplicationState: ApplicationState = {
    applications: [],
    selectedApps: [],
    loading: false,
    error: false,
    search: '',
    page: 1,
    size: 10,
}

@Injectable()
export class ApplicationListStateService extends SimpleStore<ApplicationState> {
    private applicationApiService = inject(ApplicationApiService)

    constructor() {
        super(initialApplicationState)
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
                    this.applicationApiService.findAllApplications({}),
                ),
            )
            .subscribe({
                next: (applications) => {
                    this.setState({ applications, loading: false })
                },
                error: () => {
                    this.setState({ error: true, loading: false })
                },
            })
    }

    createApplication(application: ApplicationDto) {
        this.setState({ loading: true, error: false })
        return this.applicationApiService.createApplication(application).pipe(
            tap((application) => this.pushApplication(application)),
            catchError(() => {
                this.setState({ error: true })
                return throwError(() => new Error('Failed to create project'))
            }),
            finalize(() => this.setState({ loading: false })),
        )
    }

    updateApplication(id: string, application: ApplicationDto) {
        this.setState({ loading: true, error: false })
        return this.applicationApiService
            .updateApplication(id, application)
            .pipe(
                tap((application) => this.replaceApplication(application)),
                catchError(() => {
                    this.setState({ error: true })
                    return throwError(
                        () => new Error('Failed to update project'),
                    )
                }),
                finalize(() => this.setState({ loading: false })),
            )
    }

    deleteApplication(id: string) {
        this.setState({ loading: true, error: false })
        return this.applicationApiService.deleteApplication(id).pipe(
            tap(() => this.removeApplicationFromState(id)),
            catchError(() => {
                this.setState({ error: true })
                return throwError(() => new Error('Failed to delete project'))
            }),
            finalize(() => this.setState({ loading: false })),
        )
    }

    pushApplication(application: Application) {
        this.setState({
            applications: [application, ...this.getState().applications],
        })
    }

    private replaceApplication(application: Application) {
        this.setState({
            applications: this.getState().applications.map((a) =>
                a.clientId === application.clientId ? application : a,
            ),
        })
    }

    private removeApplicationFromState(id: string) {
        this.setState({
            applications: this.getState().applications.filter(
                (a) => a.clientId !== id,
            ),
        })
    }

    setSelectedUsers(apps: Application[]) {
        this.setState({ selectedApps: [...apps] })
    }
}
