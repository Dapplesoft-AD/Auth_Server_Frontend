import { HttpClient, HttpParams } from '@angular/common/http'
import { Inject, Injectable, inject } from '@angular/core'
import { Observable } from 'rxjs'
import { ApiService } from '../../common-service/lib/api.service'
import { ENVIRONMENT, EnvironmentConfig } from '../../core'
import { Country } from './country.model'

@Injectable({
    providedIn: 'root',
})
export class CountryApiService extends ApiService<Country, Country> {
    constructor(
        @Inject(ENVIRONMENT)
        private env: EnvironmentConfig,
    ) {
        super(inject(HttpClient), `${env.apiUrl}/countries`)
    }

    findAllCountries(query?: {
        search?: string
        page?: number
        size?: number
    }): Observable<Country[]> {
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

        return this.http.get<Country[]>(this.apiUrl, { params })
    }

    createCountry(country: Country): Observable<Country> {
        return this.http.post<Country>(this.apiUrl, country)
    }

    updateCountry(id: string, country: Country): Observable<Country> {
        return this.http.put<Country>(`${this.apiUrl}/${id}`, country)
    }

    deleteCountry(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`)
    }
}
