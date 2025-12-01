import { Route } from '@angular/router'
import { PageLayout, setLayout } from '../../../../libs/common-components'
import { authGuard } from '../../../../libs/guards/auth/auth.guard'

export type PermissionsRoutes = {
    permissions: Route
}

export const permissionsRoutes: PermissionsRoutes = {
    permissions: {
        path: 'admin/permissions',
        canActivate: [authGuard],
        loadComponent: () =>
            import('./page-permissions/page-permissions.component').then(
                (m) => m.PagePermissionsComponent,
            ),
        resolve: { layout: setLayout(PageLayout.Dashboard) },
    },
}
