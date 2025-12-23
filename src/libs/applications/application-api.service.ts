import { HttpClient, HttpParams } from '@angular/common/http'
import { Inject, Injectable, inject } from '@angular/core'
import { Observable } from 'rxjs'
import { ApiService } from '../common-service/lib/api.service'
import { ENVIRONMENT, EnvironmentConfig } from '../core'
import { Application, ApplicationDto } from './application.model'

@Injectable({
    providedIn: 'root',
})
export class ApplicationApiService extends ApiService<
    Application,
    ApplicationDto
> {
    constructor(
        @Inject(ENVIRONMENT)
        private env: EnvironmentConfig,
    ) {
        super(inject(HttpClient), `${env.apiUrl}/client-apps`)
    }

    findAllApplications(query?: {
        search?: string
        page?: number
        size?: number
    }): Observable<Application[]> {
        let params = new HttpParams()

        if (query?.search) {
            params = params.set('search', query.search)
        }
        if (query?.page) {
            params = params.set('page', query.page)
        }
        if (query?.size) {
            params = params.set('size', query.size)
        }

        return this.http.get<Application[]>(this.apiUrl, { params })
    }

    createApplication(application: ApplicationDto): Observable<Application> {
        return this.http.post<Application>(this.apiUrl, application)
    }

    updateApplication(
        id: string,
        application: ApplicationDto,
    ): Observable<Application> {
        return this.http.put<Application>(`${this.apiUrl}/${id}`, application)
    }

    deleteApplication(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`)
    }
}
