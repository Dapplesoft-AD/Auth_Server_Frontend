// smtp-config-api.service.ts
import { HttpClient } from '@angular/common/http'
import { Inject, Injectable, inject } from '@angular/core'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { ApiService } from '../common-service/lib/api.service'
import { ENVIRONMENT, EnvironmentConfig } from '../core'
import { SmtpConfig, SmtpConfigDto } from './smtp-config.model'

@Injectable({
    providedIn: 'root',
})
export class SmtpConfigApiService extends ApiService<
    SmtpConfig,
    SmtpConfigDto
> {
    constructor(
        @Inject(ENVIRONMENT)
        private env: EnvironmentConfig,
    ) {
        super(inject(HttpClient), `${env.apiUrl}/SmtpConfig`)
    }

    createSmtpConfig(config: SmtpConfigDto): Observable<SmtpConfig> {
        return this.http.post<SmtpConfig>(`${this.apiUrl}/Create`, config)
    }

    sendTestEmail(request: { recipientEmail: string }): Observable<any> {
        return this.http.post(`${this.apiUrl}/SendMail`, request)
    }

    getAllConfigs(): Observable<SmtpConfig[]> {
        return this.http.get<any[]>(this.apiUrl).pipe(
            map((configs) =>
                configs.map((config) => ({
                    ...config,
                    smtpId: config.smtpId, // Ensure the property name is consistent
                })),
            ),
        )
    }

    updateConfig(id: string, config: SmtpConfigDto): Observable<SmtpConfig> {
        return this.http.put<SmtpConfig>(`${this.apiUrl}/${id}`, config)
    }

    deleteConfig(id: string): Observable<any> {
        // Make sure the endpoint URL is correct
        return this.http.delete(`${this.apiUrl}/Delete/${id}`)
    }

    testConnection(config: SmtpConfigDto): Observable<any> {
        return this.http.post(`${this.apiUrl}/TestConnection`, config)
    }
}
