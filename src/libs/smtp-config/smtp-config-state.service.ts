import { Injectable, inject } from '@angular/core'
import { catchError, Observable, tap, throwError } from 'rxjs'
import { SimpleStore } from '../store'
import { SmtpConfig, SmtpConfigDto } from './smtp-config.model'
import { SmtpConfigApiService } from './smtp-config-api.service'

export interface SmtpConfigState {
    configs: SmtpConfig[]
    loading: boolean
    error: boolean
    selectedConfig: SmtpConfig | null
    testResult: {
        success: boolean
        message: string
    } | null
}

const initialState: SmtpConfigState = {
    configs: [],
    loading: false,
    error: false,
    selectedConfig: null,
    testResult: null,
}

@Injectable()
export class SmtpConfigStateService extends SimpleStore<SmtpConfigState> {
    private smtpConfigApiService = inject(SmtpConfigApiService)

    constructor() {
        super(initialState)
    }

    init() {
        // if (this.initialized()) return
        this.loadConfigs()
        // this.initialized.set(true)
    }
    loadConfigs() {
        this.setState({ loading: true })
        return this.smtpConfigApiService.getAllConfigs().pipe(
            tap((configs) => {
                this.setState({ configs, loading: false, error: false })
            }),
            catchError((error) => {
                this.setState({ loading: false, error: true })
                return throwError(() => error)
            }),
        )
    }

    createConfig(config: SmtpConfigDto): Observable<SmtpConfig> {
        this.setState({ loading: true })
        return this.smtpConfigApiService.createSmtpConfig(config).pipe(
            tap((newConfig) => {
                const currentConfigs = this.getState().configs
                this.setState({
                    configs: [newConfig, ...currentConfigs],
                    loading: false,
                    error: false,
                })
            }),
            catchError((error) => {
                this.setState({ loading: false, error: true })
                return throwError(() => error)
            }),
        )
    }
    // smtp-config-state.service.ts
    deleteConfig(id: string): Observable<any> {
        this.setState({ loading: true })
        return this.smtpConfigApiService.deleteConfig(id).pipe(
            tap(() => {
                const currentConfigs = this.getState().configs
                const filteredConfigs = currentConfigs.filter(
                    (c) => c.smtpId !== id,
                ) // Changed from c.id
                this.setState({
                    configs: filteredConfigs,
                    loading: false,
                    error: false,
                })
            }),
            catchError((error) => {
                this.setState({ loading: false, error: true })
                return throwError(() => error)
            }),
        )
    }

    updateConfig(id: string, config: SmtpConfigDto): Observable<SmtpConfig> {
        this.setState({ loading: true })
        return this.smtpConfigApiService.updateConfig(id, config).pipe(
            tap((updatedConfig) => {
                const currentConfigs = this.getState().configs
                const updatedConfigs = currentConfigs.map(
                    (c) => (c.smtpId === id ? updatedConfig : c), // Changed from c.id
                )
                this.setState({
                    configs: updatedConfigs,
                    loading: false,
                    error: false,
                })
            }),
            catchError((error) => {
                this.setState({ loading: false, error: true })
                return throwError(() => error)
            }),
        )
    }

    sendTestEmail(recipientEmail: string): Observable<any> {
        this.setState({ loading: true, testResult: null })
        return this.smtpConfigApiService.sendTestEmail({ recipientEmail }).pipe(
            tap(() => {
                this.setState({
                    loading: false,
                    testResult: {
                        success: true,
                        message: 'Test email sent successfully!',
                    },
                })
            }),
            catchError((error) => {
                this.setState({
                    loading: false,
                    testResult: {
                        success: false,
                        message:
                            error.error?.message || 'Failed to send test email',
                    },
                })
                return throwError(() => error)
            }),
        )
    }

    testConnection(config: SmtpConfigDto): Observable<any> {
        this.setState({ loading: true, testResult: null })
        return this.smtpConfigApiService.testConnection(config).pipe(
            tap(() => {
                this.setState({
                    loading: false,
                    testResult: {
                        success: true,
                        message: 'SMTP connection successful!',
                    },
                })
            }),
            catchError((error) => {
                this.setState({
                    loading: false,
                    testResult: {
                        success: false,
                        message: error.error?.message || 'Connection failed',
                    },
                })
                return throwError(() => error)
            }),
        )
    }

    selectConfig(config: SmtpConfig | null) {
        this.setState({ selectedConfig: config })
    }

    clearTestResult() {
        this.setState({ testResult: null })
    }
}
