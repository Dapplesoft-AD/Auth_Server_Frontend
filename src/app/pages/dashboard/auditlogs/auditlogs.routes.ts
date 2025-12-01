import { Route } from '@angular/router'
import { PageLayout, setLayout } from '../../../../libs/common-components'
import { authGuard } from '../../../../libs/guards/auth/auth.guard'

export type AuditLogsRoutes = {
    auditlogs: Route
}

export const auditlogsRoutes: AuditLogsRoutes = {
    auditlogs: {
        path: 'admin/auditlogs',
        canActivate: [authGuard],
        loadComponent: () =>
            import('./page-auditlogs/page-auditlogs.component').then(
                (m) => m.PageAuditLogsRoutesComponent,
            ),
        resolve: { layout: setLayout(PageLayout.Dashboard) },
    },
}
