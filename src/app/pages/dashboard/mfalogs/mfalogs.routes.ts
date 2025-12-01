import { Route } from '@angular/router'
import { PageLayout, setLayout } from '../../../../libs/common-components'
import { authGuard } from '../../../../libs/guards/auth/auth.guard'

export type MfaLogsRoutes = {
    mfalogs: Route
}

export const mfalogsRoutes: MfaLogsRoutes = {
    mfalogs: {
        path: 'admin/mfalogs',
        canActivate: [authGuard],
        loadComponent: () =>
            import('./page-mfalogs/page-mfalogs.component').then(
                (m) => m.PageMfaLogsRoutesComponent,
            ),
        resolve: { layout: setLayout(PageLayout.Dashboard) },
    },
}
