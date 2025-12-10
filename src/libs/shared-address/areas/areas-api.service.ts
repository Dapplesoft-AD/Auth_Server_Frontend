import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from '../../../environments/environment.staging'
import { Area } from './areas.model'

@Injectable({
    providedIn: 'root',
})
export class AreaApiService {
    private apiUrl = `${environment.apiUrl}`

    constructor(private http: HttpClient) {}

    getAreas(): Observable<Area[]> {
        return this.http.get<Area[]>(this.apiUrl + '/areas')
    }
    createAreas(area: Area): Observable<Area> {
        return this.http.post<Area>(`${this.apiUrl}/areas`, area)
    }
    updateAreas(id: string, data: Partial<Area>): Observable<Area> {
        return this.http.put<Area>(`${this.apiUrl}/areas/${id}`, data)
    }
    deleteAreas(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/areas/${id}`)
    }
}
