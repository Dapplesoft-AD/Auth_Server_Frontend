import { HttpClient } from '@angular/common/http'
import { Injectable, inject } from '@angular/core'
import { Router } from '@angular/router'
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs'
import { authRoutes } from '../../../app/pages/auth/auth.route'
import { environment } from '../../../environments/environment'

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private router = inject(Router)
    private http = inject(HttpClient)
    private authApiUrl = `${environment.authApiUrl}`

    // cached auth state
    private authState$ = new BehaviorSubject<boolean | null>(null)
    private redirecting = false

    isLoggedIn(): Observable<boolean> {
        if (this.authState$.value !== null) {
            return of(this.authState$.value)
        }
        return this.http
            .get(`${this.authApiUrl}/me`, { withCredentials: true })
            .pipe(
                map(() => true),
                tap((v) => this.authState$.next(v)),
                catchError(() => {
                    this.authState$.next(false)
                    return of(false)
                }),
            )
    }
    logout() {
        this.http
            .post(`${this.authApiUrl}/logout`, {}, { withCredentials: true })
            .subscribe(() => {
                this.authState$.next(false)
                this.router.navigate(['/login'])
            })
    }

    clearAuthState() {
        this.authState$.next(false)
    }

    setAuthenticated() {
        this.redirecting = false
        this.authState$.next(true)
    }

    handleUnauthorized() {
        if (this.redirecting) return
        this.redirecting = true
        this.authState$.next(false)
        this.router.navigate([authRoutes.login.path])
    }
}
