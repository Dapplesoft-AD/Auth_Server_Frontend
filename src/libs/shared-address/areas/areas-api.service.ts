import { HttpClient, HttpParams } from '@angular/common/http'
import { Inject, Injectable, inject } from '@angular/core'
import { Observable } from 'rxjs'
import { ApiService } from '../../common-service/lib/api.service'
import { ENVIRONMENT, EnvironmentConfig } from '../../core'
import { Area } from './areas.model'

@Injectable({
    providedIn: 'root',
})
export class AreaApiService extends ApiService<Area, Area> {
    constructor(
        @Inject(ENVIRONMENT)
        private env: EnvironmentConfig,
    ) {
        super(inject(HttpClient), `${env.apiUrl}/areas`)
    }

    findAllAreas(query?: {
        search?: string
        page?: number
        size?: number
    }): Observable<Area[]> {
        let params = new HttpParams()

        if (query?.search) {
            params = params.set('search', query.search)
        }
        if (query?.page !== undefined) {
            params = params.set('page', query.page.toString())
        }
        if (query?.size !== undefined) {
            params = params.set('size', query.size.toString())
        }

        return this.http.get<Area[]>(this.apiUrl, { params })
    }

    createArea(area: Area): Observable<Area> {
        return this.http.post<Area>(this.apiUrl, area)
    }

    updateArea(id: string, area: Area): Observable<Area> {
        return this.http.put<Area>(`${this.apiUrl}/${id}`, area)
    }

    deleteArea(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`)
    }
}
