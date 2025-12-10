import { Route } from '@angular/router'
import { PageLayout, setLayout } from '../../../libs/common-components'

export type AddressRoutes = {
    country: Route
    region: Route
    district: Route
    area: Route
    localitie: Route
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
    region: {
        path: 'admin/region',
        loadComponent: () =>
            import('./page-regions/page-regions.component').then(
                (m) => m.PageRegionsComponent,
            ),
        resolve: { layout: setLayout(PageLayout.Dashboard) },
    },
    district: {
        path: 'admin/district',
        loadComponent: () =>
            import('./page-districts/page-districts.component').then(
                (m) => m.PageDistrictsComponent,
            ),
        resolve: { layout: setLayout(PageLayout.Dashboard) },
    },
    area: {
        path: 'admin/area',
        loadComponent: () =>
            import('./page-areas/page-areas.component').then(
                (m) => m.PageAreasComponent,
            ),
        resolve: { layout: setLayout(PageLayout.Dashboard) },
    },
    localitie: {
        path: 'admin/localitie',
        loadComponent: () =>
            import('./page-localities/page-localities.component').then(
                (m) => m.PageLocalitiesComponent,
            ),
        resolve: { layout: setLayout(PageLayout.Dashboard) },
    },
}
