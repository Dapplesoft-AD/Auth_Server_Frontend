import { Route } from '@angular/router'
import { PageLayout, setLayout } from '../../../../libs/common-components'

export type UserRoutes = {
    user: Route
}

export const userRoutes: UserRoutes = {
    user: {
        path: 'admin/user',
        loadComponent: () =>
            import('./page-user/page-user.component').then(
                (m) => m.PageUserComponent,
            ),
        resolve: { layout: setLayout(PageLayout.Dashboard) },
    },
}
