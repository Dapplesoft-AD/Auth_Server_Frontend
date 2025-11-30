import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { PasswordReset } from './passwordreset.model'

@Injectable({
    providedIn: 'root',
})
export class PasswordResetApiService {
    private baseUrl = '/api/password-reset'

    constructor(private http: HttpClient) {}

    getAll(): Observable<PasswordReset[]> {
        return this.http.get<PasswordReset[]>(this.baseUrl)
    }

    create(data: PasswordReset): Observable<PasswordReset> {
        return this.http.post<PasswordReset>(this.baseUrl, data)
    }

    update(id: number, data: PasswordReset): Observable<PasswordReset> {
        return this.http.put<PasswordReset>(`${this.baseUrl}/${id}`, data)
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`)
    }
}
