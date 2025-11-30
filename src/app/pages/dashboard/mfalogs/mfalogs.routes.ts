import { Route } from '@angular/router'
import { PageLayout, setLayout } from '../../../../libs/common-components'

export type MfaLogsRoutes = {
    mfalogs: Route
}

export const mfalogsRoutes: MfaLogsRoutes = {
    mfalogs: {
        path: 'admin/mfalogs',
        loadComponent: () =>
            import('./page-mfalogs/page-mfalogs.component').then(
                (m) => m.PageMfaLogsRoutesComponent,
            ),
        resolve: { layout: setLayout(PageLayout.Dashboard) },
    },
}
