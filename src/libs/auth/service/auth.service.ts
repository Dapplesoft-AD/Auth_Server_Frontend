import { HttpClient } from '@angular/common/http'
import { Injectable, inject } from '@angular/core'
import { Router } from '@angular/router'
import { catchError, map, Observable, of } from 'rxjs'
import { environment } from '../../../environments/environment'
import { ContextUserStorageService } from './contextUser-storage.service'
import { TokenStorageService } from './token-storage.service'

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private router = inject(Router)
    private tokenStorage = inject(TokenStorageService)
    private contextUserIdStorageService = inject(ContextUserStorageService)
    private http = inject(HttpClient)
    private authApiUrl = `${environment.authApiUrl}`

    isLoggedIn(): Observable<boolean> {
        return this.http
            .get(`${this.authApiUrl}/me`, { withCredentials: true })
            .pipe(
                map(() => true),
                catchError(() => of(false)),
            )
    }
    logout() {
        return this.http
            .post(`${this.authApiUrl}/logout`, {}, { withCredentials: true })
            .subscribe(() => this.router.navigate(['/login']))
    }
}
