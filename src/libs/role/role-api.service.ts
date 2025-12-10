import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from '../../environments/environment.staging'
import { Role } from './role.model'

@Injectable({
    providedIn: 'root',
})
export class RoleApiService {
    private apiUrl = `${environment.apiUrl}`

    constructor(private http: HttpClient) {}

    getRoles(): Observable<Role[]> {
        return this.http.get<Role[]>(this.apiUrl + '/roles')
    }
    createRole(role: Partial<Role>): Observable<Role> {
        return this.http.post<Role>(`${this.apiUrl}/roles`, role)
    }

    updateRole(id: string, data: Partial<Role>): Observable<Role> {
        return this.http.put<Role>(`${this.apiUrl}/roles/${id}`, data)
    }

    deleteRole(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/roles/${id}`)
    }
}
