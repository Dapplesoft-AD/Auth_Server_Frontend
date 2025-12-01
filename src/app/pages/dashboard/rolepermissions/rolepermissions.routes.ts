import { Route } from '@angular/router'
import { PageLayout, setLayout } from '../../../../libs/common-components'

export type RolePermissionsRoutes = {
    rolepermissions: Route
}

export const rolePermissionsRoutes: RolePermissionsRoutes = {
    rolepermissions: {
        path: 'admin/rolepermissions',
        loadComponent: () =>
            import(
                './page-rolepermissions/page-rolepermissions.component'
            ).then((m) => m.RolePermissionsRoutes),
        resolve: { layout: setLayout(PageLayout.Dashboard) },
    },
}
