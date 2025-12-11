import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from '../../../environments/environment.staging'
import { District } from './districts.model'

@Injectable({
    providedIn: 'root',
})
export class DistrictApiService {
    private apiUrl = `${environment.apiUrl}`

    constructor(private http: HttpClient) {}

    getDistricts(): Observable<District[]> {
        return this.http.get<District[]>(this.apiUrl + '/districts')
    }
    createDistricts(district: District): Observable<District> {
        return this.http.post<District>(`${this.apiUrl}/districts`, district)
    }

    updateDistricts(id: string, data: Partial<District>): Observable<District> {
        return this.http.put<District>(`${this.apiUrl}/districts/${id}`, data)
    }
    deleteDistricts(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/districts/${id}`)
    }
}
