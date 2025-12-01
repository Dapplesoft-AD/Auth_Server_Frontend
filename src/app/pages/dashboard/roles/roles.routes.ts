import { Route } from '@angular/router'
import { PageLayout, setLayout } from '../../../../libs/common-components'
import { authGuard } from '../../../../libs/guards/auth/auth.guard'

export type RolesRoutes = {
    roles: Route
}

export const rolesRoutes: RolesRoutes = {
    roles: {
        path: 'admin/roles',
        canActivate: [authGuard],
        loadComponent: () =>
            import('./page-roles/page-roles.component').then(
                (m) => m.PageRolesComponent,
            ),
        resolve: { layout: setLayout(PageLayout.Dashboard) },
    },
}
