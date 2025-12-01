import { Route } from '@angular/router'
import { PageLayout, setLayout } from '../../../../libs/common-components'
import { authGuard } from '../../../../libs/guards/auth/auth.guard'

export type RolePermissionsRoutes = {
    rolepermissions: Route
}

export const rolePermissionsRoutes: RolePermissionsRoutes = {
    rolepermissions: {
        path: 'admin/rolepermissions',
        canActivate: [authGuard],
        loadComponent: () =>
            import(
                './page-rolepermissions/page-rolepermissions.component'
            ).then((m) => m.RolePermissionsRoutes),
        resolve: { layout: setLayout(PageLayout.Dashboard) },
    },
}
