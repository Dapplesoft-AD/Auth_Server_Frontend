import { Route } from '@angular/router'
import { PageLayout, setLayout } from '../../../../libs/common-components'

export type PermissionsRoutes = {
    permissions: Route
}

export const permissionsRoutes: PermissionsRoutes = {
    permissions: {
        path: 'admin/permissions',
        loadComponent: () =>
            import('./page-permissions/page-permissions.component').then(
                (m) => m.PagePermissionsComponent,
            ),
        resolve: { layout: setLayout(PageLayout.Dashboard) },
    },
}
