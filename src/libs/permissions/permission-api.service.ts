import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { Permission } from './permission.model'

@Injectable({
    providedIn: 'root',
})
export class PermissionsApiService {
    private baseUrl = '/api/permissions'

    constructor(private http: HttpClient) {}

    getPermissions(): Observable<Permission[]> {
        return this.http.get<Permission[]>(this.baseUrl)
    }

    addPermission(permission: Permission): Observable<Permission> {
        return this.http.post<Permission>(this.baseUrl, permission)
    }

    updatePermission(
        id: bigint,
        permission: Permission,
    ): Observable<Permission> {
        return this.http.put<Permission>(`${this.baseUrl}/${id}`, permission)
    }

    deletePermission(id: bigint): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`)
    }
}
