import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { map, Observable, throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { environment } from '../../environments/environment'
import { Role } from './role.model'

@Injectable({ providedIn: 'root' })
export class RoleApiService {
    private apiUrl = `${environment.apiUrl}/roles`

    constructor(private http: HttpClient) {}

    private getAuthHeaders(): HttpHeaders {
        const token = localStorage.getItem('jwtToken')
        return new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: token ? `Bearer ${token}` : '',
        })
    }

    // Convert backend Role → frontend Role
    private toFrontend(role: any): Role {
        return {
            id: role.id,
            role_name: role.roleName, // backend returns roleName (camelCase)
            description: role.description,
        }
    }

    // Convert form → backend DTO
    private toDto(formValue: any): any {
        return {
            roleName: formValue.role_name, // backend expects roleName (camelCase)
            description: formValue.description,
        }
    }

    // GET all roles
    getRoles(): Observable<Role[]> {
        return this.http
            .get<any[]>(this.apiUrl, { headers: this.getAuthHeaders() })
            .pipe(
                map((roles) => roles.map((r) => this.toFrontend(r))),
                catchError(this.handleError),
            )
    }

    // GET by ID
    getById(id: number): Observable<Role> {
        return this.http
            .get<any>(`${this.apiUrl}/${id}`, {
                headers: this.getAuthHeaders(),
            })
            .pipe(
                map((role) => this.toFrontend(role)),
                catchError(this.handleError),
            )
    }

    // CREATE
    create(formValue: any): Observable<Role> {
        const dto = this.toDto(formValue)
        return this.http
            .post<any>(this.apiUrl, dto, { headers: this.getAuthHeaders() })
            .pipe(
                map((role) => this.toFrontend(role)),
                catchError(this.handleError),
            )
    }

    // UPDATE
    update(id: number, formValue: any): Observable<Role> {
        const dto = this.toDto(formValue)
        return this.http
            .put<any>(`${this.apiUrl}/${id}`, dto, {
                headers: this.getAuthHeaders(),
            })
            .pipe(
                map((role) => this.toFrontend(role)),
                catchError(this.handleError),
            )
    }

    // DELETE
    deleteRole(id: number): Observable<any> {
        return this.http
            .delete(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() })
            .pipe(catchError(this.handleError))
    }

    private handleError(error: any) {
        console.error('API Error:', error)
        return throwError(() => error)
    }
}
