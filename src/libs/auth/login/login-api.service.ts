import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Injectable, inject } from '@angular/core'
import { catchError, Observable, tap, throwError } from 'rxjs'
import { environment } from '../../../environments/environment'
import { AuthService } from '../service/auth.service'
import { ContextUserStorageService } from '../service/contextUser-storage.service'
import { TokenStorageService } from '../service/token-storage.service'
import { LoginRequest, LoginResponse } from './login.model'

@Injectable({
    providedIn: 'root',
})
export class LoginApiService {
    // Modern dependency injection
    private http = inject(HttpClient)
    private tokenStorageService = inject(TokenStorageService)
    private contextUserIdStorageService = inject(ContextUserStorageService)
    private authService = inject(AuthService)
    private authApiUrl = `${environment.authApiUrl}`

    login(payload: LoginRequest): Observable<LoginResponse | string> {
        return this.http
            .post<LoginResponse | string>(
                `${this.authApiUrl}/users/login`,
                payload,
            )
            .pipe(
                tap((response) => this.handleLoginResponse(response)),
                catchError((error) => {
                    this.authService.logout()
                    return this.handleLoginError(error)
                }),
            )
    }

    private handleLoginResponse(response: LoginResponse | string): void {
        if (typeof response === 'string') {
            // tmp
            // only Token as raw string
            this.tokenStorageService.saveAccessToken(response)
            return
        }
        if (response?.token) {
            this.tokenStorageService.saveAccessToken(response.token)
        }
        if (response?.refreshToken) {
            this.tokenStorageService.saveRefreshToken(response.refreshToken)
        }
        if (response?.user?.id) {
            this.contextUserIdStorageService.saveContextUserId(response.user.id)
        }
    }

    private handleLoginError(error: unknown) {
        if (error instanceof HttpErrorResponse) {
            return throwError(() => error)
        }
        return throwError(() => new Error('Unknown login error'))
    }
}
