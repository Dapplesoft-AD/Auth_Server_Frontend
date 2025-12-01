import { Route } from '@angular/router'
import { PageLayout, setLayout } from '../../../../libs/common-components'
import { authGuard } from '../../../../libs/guards/auth/auth.guard'

export type UserRoutes = {
    user: Route
}

export const userRoutes: UserRoutes = {
    user: {
        path: 'admin/user',
        canActivate: [authGuard],
        loadComponent: () =>
            import('./page-user/page-user.component').then(
                (m) => m.PageUserComponent,
            ),
        resolve: { layout: setLayout(PageLayout.Dashboard) },
    },
}
