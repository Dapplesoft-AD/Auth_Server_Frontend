import { Route } from '@angular/router'
import { PageLayout, setLayout } from '../../../../libs/common-components'

export type ApplicationsRoutes = {
    applications: Route
}

export const applicationsRoutes: ApplicationsRoutes = {
    applications: {
        path: 'admin/applications',
        loadComponent: () =>
            import('./page-applications/page-applications.component').then(
                (m) => m.PageApplicationsComponent,
            ),
        resolve: { layout: setLayout(PageLayout.Dashboard) },
    },
}
