import { Route } from '@angular/router'
import { PageLayout, setLayout } from '../../../../libs/common-components'

export type AuditLogsRoutes = {
    auditlogs: Route
}

export const auditlogsRoutes: AuditLogsRoutes = {
    auditlogs: {
        path: 'admin/auditlogs',
        loadComponent: () =>
            import('./page-auditlogs/page-auditlogs.component').then(
                (m) => m.PageAuditLogsRoutesComponent,
            ),
        resolve: { layout: setLayout(PageLayout.Dashboard) },
    },
}
