import { HttpClient, HttpParams } from '@angular/common/http'
import { Inject, Injectable, inject } from '@angular/core'
import { Observable } from 'rxjs'
import { ApiService } from '../common-service/lib/api.service'
import { ENVIRONMENT, EnvironmentConfig } from '../core'
import { Role, RoleDto } from './role.model'

@Injectable({
    providedIn: 'root',
})
export class RoleApiService extends ApiService<Role, RoleDto> {
    constructor(
        @Inject(ENVIRONMENT)
        private env: EnvironmentConfig,
    ) {
        super(inject(HttpClient), `${env.apiUrl}/roles`)
    }

    findAllRoles(query?: {
        search?: string
        page?: number
        size?: number
    }): Observable<Role[]> {
        let params = new HttpParams()

        if (query?.search) {
            params = params.set('search', query.search)
        }
        if (query?.page) {
            params = params.set('page', query.page)
        }
        if (query?.size) {
            params = params.set('size', query.size)
        }

        return this.http.get<Role[]>(this.apiUrl, { params })
    }

    createRole(role: RoleDto): Observable<Role> {
        return this.http.post<Role>(this.apiUrl, role)
    }

    updateRole(id: string, role: RoleDto): Observable<Role> {
        return this.http.put<Role>(`${this.apiUrl}/${id}`, role)
    }

    deleteRole(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`)
    }
}
