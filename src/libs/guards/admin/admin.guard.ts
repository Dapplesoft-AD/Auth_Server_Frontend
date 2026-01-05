import { inject } from '@angular/core'
import { CanActivateFn, Router } from '@angular/router'
import { catchError, map, of, tap } from 'rxjs'
import { authRoutes } from '../../../app/pages/auth/auth.route'
import { publicRoutes } from '../../../app/pages/public/public.route'
import { AuthService } from '../../auth/service/auth.service'

export const adminGuard: CanActivateFn = (route, state) => {
    const auth = inject(AuthService)
    const router = inject(Router)

    // Use cached admin state if available
    if (auth.adminState$.value !== null) {
        return of(
            auth.adminState$.value
                ? true
                : router.createUrlTree([publicRoutes.user_profile.path]),
        )
    }

    return auth.isAdmin().pipe(
        map((isAdmin) => {
            if (isAdmin) {
                return true
            }
            return router.createUrlTree([publicRoutes.user_profile.path])
        }),
        tap((result) => {
            // Only cache if result is boolean
            if (typeof result === 'boolean') {
                auth.adminState$.next(result)
            }
        }),
        catchError((err) => {
            if (err.status === 403) {
                auth.adminState$.next(false)
                return of(
                    router.createUrlTree([publicRoutes.user_profile.path]),
                )
            }
            return of(router.createUrlTree([authRoutes.login.path]))
        }),
    )
}
