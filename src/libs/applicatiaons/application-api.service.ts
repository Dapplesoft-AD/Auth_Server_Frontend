import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { Application } from './application.model'

@Injectable({ providedIn: 'root' })
export class ApplicationApiService {
    private apiUrl = '/api/applications'

    constructor(private http: HttpClient) {}

    getAll(): Observable<Application[]> {
        return this.http.get<Application[]>(this.apiUrl)
    }

    getById(id: bigint): Observable<Application> {
        return this.http.get<Application>(`${this.apiUrl}/${id}`)
    }

    create(app: Application): Observable<Application> {
        return this.http.post<Application>(this.apiUrl, app)
    }

    update(id: bigint, data: Partial<Application>): Observable<Application> {
        return this.http.put<Application>(`${this.apiUrl}/${id}`, data)
    }

    delete(id: bigint): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`)
    }
}
