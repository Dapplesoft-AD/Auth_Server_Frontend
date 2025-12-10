import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from '../../../environments/environment.staging'

import { Country } from './country.model'

@Injectable({
    providedIn: 'root',
})
export class CountryApiService {
    private apiUrl = `${environment.apiUrl}`

    constructor(private http: HttpClient) {}

    getCountries(): Observable<Country[]> {
        return this.http.get<Country[]>(this.apiUrl + '/countries')
    }
    createCountries(country: Country): Observable<Country> {
        return this.http.post<Country>(`${this.apiUrl}/countries`, country)
    }

    updateCountries(id: string, data: Partial<Country>): Observable<Country> {
        return this.http.put<Country>(`${this.apiUrl}/countries/${id}`, data)
    }
    deleteCountries(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/countries/${id}`)
    }
}
