import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from '../../../environments/environment.staging'
import { Localitie } from './localities.model'

@Injectable({
    providedIn: 'root',
})
export class LocalitieApiService {
    private apiUrl = `${environment.apiUrl}`

    constructor(private http: HttpClient) {}

    getLocalities(): Observable<Localitie[]> {
        return this.http.get<Localitie[]>(this.apiUrl + '/localities')
    }
    createLocalities(localitie: Localitie): Observable<Localitie> {
        return this.http.post<Localitie>(`${this.apiUrl}/localities`, localitie)
    }
    updateLocalities(
        id: string,
        data: Partial<Localitie>,
    ): Observable<Localitie> {
        return this.http.put<Localitie>(`${this.apiUrl}/localities/${id}`, data)
    }
    deleteLocalities(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/localities/${id}`)
    }
}
