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

    getCountris(): Observable<Country[]> {
        return this.http.get<Country[]>(this.apiUrl + '/countries')
    }
    createCountris(country: Country): Observable<Country> {
        return this.http.post<Country>(`${this.apiUrl}/countries`, country)
    }

    updateCountris(id: string, data: Partial<Country>): Observable<Country> {
        return this.http.put<Country>(`${this.apiUrl}/countries/${id}`, data)
    }
    deleteCountris(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/countries/${id}`)
    }
}
