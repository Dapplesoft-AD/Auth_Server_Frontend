import { inject } from '@angular/core'
import { CanActivateFn, Router } from '@angular/router'
import { AuthService } from '../../auth/service/auth.service'

export const authGuard: CanActivateFn = (route, state) => {
    const auth = inject(AuthService)
    const router = inject(Router)

    if (auth.isLoggedIn()) {
        return true
    }

    // redirect if not logged in
    return router.createUrlTree(['/login'])
}
