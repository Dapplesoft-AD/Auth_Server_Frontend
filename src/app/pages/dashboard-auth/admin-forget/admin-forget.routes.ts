import { Route } from '@angular/router'
import { PageLayout, setLayout } from '../../../../libs/common-components'

export type AdminForgetRoutes = {
    forget: Route
}

export const adminForgetRoutes: AdminForgetRoutes = {
    forget: {
        path: 'admin/forget',
        loadComponent: () =>
            import('./page-admin-forget/page-admin-forget.component').then(
                (m) => m.PageAdminForgetComponent,
            ),
        resolve: { layout: setLayout(PageLayout.Dashboard) },
    },
}
