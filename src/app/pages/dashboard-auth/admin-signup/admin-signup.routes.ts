import { Route } from '@angular/router'
import { PageLayout, setLayout } from '../../../libs/common-components'

export type AdminSignupRoutes = {
    signup: Route
}

export const adminSignupRoutes: AdminSignupRoutes = {
    signup: {
        path: 'admin/signup',
        loadComponent: () =>
            import('./page-admin-signup/page-admin-signup.component').then(
                (m) => m.PageAdminSignupComponent,
            ),
        resolve: { layout: setLayout(PageLayout.Dashboard) },
    },
}
