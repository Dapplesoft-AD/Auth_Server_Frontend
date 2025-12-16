import { HttpClient, HttpParams } from '@angular/common/http'
import { Inject, Injectable, inject } from '@angular/core'
import { Observable } from 'rxjs'
import { ApiService } from '../../common-service/lib/api.service'
import { ENVIRONMENT, EnvironmentConfig } from '../../core'
import { Localitie } from './localities.model'

@Injectable({
    providedIn: 'root',
})
export class LocalitieApiService extends ApiService<Localitie, Localitie> {
    constructor(@Inject(ENVIRONMENT) private env: EnvironmentConfig) {
        super(inject(HttpClient), `${env.apiUrl}/localities`)
    }

    findAllLocalities(query?: {
        search?: string
        page?: number
        size?: number
    }): Observable<Localitie[]> {
        let params = new HttpParams()

        if (query?.search) params = params.set('search', query.search)
        if (query?.page) params = params.set('page', query.page.toString())
        if (query?.size) params = params.set('size', query.size.toString())

        return this.http.get<Localitie[]>(this.apiUrl, { params })
    }

    createLocalitie(localitie: Localitie): Observable<Localitie> {
        return this.http.post<Localitie>(this.apiUrl, localitie)
    }

    updateLocalitie(id: string, localitie: Localitie): Observable<Localitie> {
        return this.http.put<Localitie>(`${this.apiUrl}/${id}`, localitie)
    }

    deleteLocalitie(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`)
    }
}
