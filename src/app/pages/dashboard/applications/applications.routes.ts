import { Route } from '@angular/router'
import { PageLayout, setLayout } from '../../../../libs/common-components'
import { authGuard } from '../../../../libs/guards/auth/auth.guard'

export type ApplicationsRoutes = {
    applications: Route
}

export const applicationsRoutes: ApplicationsRoutes = {
    applications: {
        path: 'admin/applications',
        canActivate: [authGuard],
        loadComponent: () =>
            import('./page-applications/page-applications.component').then(
                (m) => m.PageApplicationsComponent,
            ),
        resolve: { layout: setLayout(PageLayout.Dashboard) },
    },
}
