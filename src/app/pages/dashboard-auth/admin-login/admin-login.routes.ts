import { Route } from '@angular/router'
import { PageLayout, setLayout } from '../../../libs/common-components'

export type AdminLoginRoutes = {
    login: Route
}

export const adminLoginRoutes: AdminLoginRoutes = {
    login: {
        path: 'admin/login',
        loadComponent: () =>
            import('./page-admin-login/page-admin-login.component').then(
                (m) => m.PageAdminLoginComponent,
            ),
        resolve: { layout: setLayout(PageLayout.Dashboard) },
    },
}
