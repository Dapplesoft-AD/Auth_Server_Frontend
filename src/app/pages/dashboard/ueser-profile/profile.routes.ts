import { Route } from '@angular/router'
import { PageLayout, setLayout } from '../../../../libs/common-components'
import { authGuard } from '../../../../libs/guards/auth/auth.guard'

export type ProfileRoutes = {
    profile: Route
}

export const profileRoutes: ProfileRoutes = {
    profile: {
        path: 'admin/profile',
        canActivate: [authGuard],
        loadComponent: () =>
            import('./page-user-profile/page-profile.component').then(
                (m) => m.PageProfileComponent,
            ),
        resolve: { layout: setLayout(PageLayout.Dashboard) },
    },
}
