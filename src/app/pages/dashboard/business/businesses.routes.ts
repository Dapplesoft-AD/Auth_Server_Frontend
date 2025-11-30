import { Route } from '@angular/router'
import { PageLayout, setLayout } from '../../../../libs/common-components'

export type BusinessesRoutes = {
    businesses: Route
}

export const businessesRoutes: BusinessesRoutes = {
    businesses: {
        path: 'admin/businesses',
        loadComponent: () =>
            import('./page-businesses/page-businesses.component').then(
                (m) => m.PageBusinessesComponent,
            ),
        resolve: { layout: setLayout(PageLayout.Dashboard) },
    },
}
