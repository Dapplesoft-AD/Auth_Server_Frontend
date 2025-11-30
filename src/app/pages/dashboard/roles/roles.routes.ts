import { Route } from '@angular/router'
import { PageLayout, setLayout } from '../../../../libs/common-components'

export type RolesRoutes = {
    roles: Route
}

export const rolesRoutes: RolesRoutes = {
    roles: {
        path: 'admin/roles',
        loadComponent: () =>
            import('./page-roles/page-roles.component').then(
                (m) => m.PageRolesComponent,
            ),
        resolve: { layout: setLayout(PageLayout.Dashboard) },
    },
}
