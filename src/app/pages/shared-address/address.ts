import { Route } from '@angular/router'
import { PageLayout, setLayout } from '../../../libs/common-components'

export type AddressRoutes = {
    country: Route
    // region:Route
}

export const addressRoutes: AddressRoutes = {
    country: {
        path: 'admin/country',
        loadComponent: () =>
            import('./page-countries/page-countries.component').then(
                (m) => m.PageCountriesComponent,
            ),
        resolve: { layout: setLayout(PageLayout.Dashboard) },
    },
    //    region: {
    //         path: 'admin/region',
    //         loadComponent: () =>
    //             import('./page-regions/page-regions.component').then(
    //                 (m) => m.PageRegionsComponent,
    //             ),
    //         resolve: { layout: setLayout(PageLayout.Dashboard) },
    //     }
}
