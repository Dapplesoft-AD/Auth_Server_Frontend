import { inject } from '@angular/core'
import { CanActivateFn, Router } from '@angular/router'
import { catchError, map, of } from 'rxjs'
import { AuthService } from '../../auth/service/auth.service'

export const authGuard: CanActivateFn = (route, state) => {
    const auth = inject(AuthService)
    const router = inject(Router)

    return auth.isLoggedIn().pipe(
        map((isLogged) => (isLogged ? true : router.createUrlTree(['/login']))),
        catchError(() => of(router.createUrlTree(['/login']))),
    )
}
