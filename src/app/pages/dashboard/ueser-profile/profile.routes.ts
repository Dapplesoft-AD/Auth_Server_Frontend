import { Route } from '@angular/router'
import { PageLayout, setLayout } from '../../../../libs/common-components'

export type ProfileRoutes = {
    profile: Route
}

export const profileRoutes: ProfileRoutes = {
    profile: {
        path: 'admin/profile',
        loadComponent: () =>
            import('./page-user-profile/page-profile.component').then(
                (m) => m.PageProfileComponent,
            ),
        resolve: { layout: setLayout(PageLayout.Dashboard) },
    },
}
