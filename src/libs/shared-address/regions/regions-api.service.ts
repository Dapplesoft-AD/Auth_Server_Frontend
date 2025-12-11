import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from '../../../environments/environment.staging'
import { Region } from './regions.model'

@Injectable({
    providedIn: 'root',
})
export class RegionApiService {
    private apiUrl = `${environment.apiUrl}`

    constructor(private http: HttpClient) {}

    getRegions(): Observable<Region[]> {
        return this.http.get<Region[]>(this.apiUrl + '/regions')
    }
    createRegions(region: Region): Observable<Region> {
        return this.http.post<Region>(`${this.apiUrl}/regions`, region)
    }

    updateRegions(id: string, data: Partial<Region>): Observable<Region> {
        return this.http.put<Region>(`${this.apiUrl}/regions/${id}`, data)
    }
    deleteRegions(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/regions/${id}`)
    }
}
