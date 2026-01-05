import { HttpClient } from '@angular/common/http'
import { Injectable, inject } from '@angular/core'
import { Router } from '@angular/router'
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs'
import { authRoutes } from '../../../app/pages/auth/auth.route'
import { publicRoutes } from '../../../app/pages/public/public.route'
import { environment } from '../../../environments/environment'
import { ContextUserStorageService } from './contextUser-storage.service'
import { role } from './role.consts'

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private router = inject(Router)
    private http = inject(HttpClient)
    private authApiUrl = `${environment.authApiUrl}`
    private contextUserStorage = inject(ContextUserStorageService)

    // cached auth state
    private authState$ = new BehaviorSubject<boolean | null>(null)
    private redirecting = false

    // cached admin state
    public adminState$ = new BehaviorSubject<boolean | null>(null)

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

    isAdmin(): Observable<boolean> {
        if (this.adminState$.value !== null) {
            return of(this.adminState$.value)
        }
        const userRole = this.contextUserStorage.getContextUserRole()
        if (userRole === role.admin) {
            this.adminState$.next(true)
            return of(true)
        }
        return of(false)
    }

    logout() {
        this.http
            .post(`${this.authApiUrl}/logout`, {}, { withCredentials: true })
            .subscribe(() => {
                this.authState$.next(false)
                this.router.navigate([authRoutes.login])
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
    handleForbidden() {
        if (this.redirecting) return
        this.redirecting = true
        this.adminState$.next(false)
        this.router.navigate([publicRoutes.user_profile.path])
    }
}
