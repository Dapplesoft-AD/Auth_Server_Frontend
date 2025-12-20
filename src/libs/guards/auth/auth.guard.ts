import { inject } from '@angular/core'
import { CanActivateFn, Router } from '@angular/router'
import { catchError, map, of } from 'rxjs'
import { AuthService } from '../../auth/service/auth.service'

export const authGuard: CanActivateFn = (route, state) => {
    const auth = inject(AuthService)
    const router = inject(Router)

    return auth.isLoggedIn().pipe(
        map((isLogged) => {
            if (isLogged) {
                return true // Allow the route activation
            }
            return router.createUrlTree(['/login']) // Redirect to login if not logged in
        }),
        catchError(() => {
            // Handle any errors
            return of(router.createUrlTree(['/login']))
        }),
    )
}
