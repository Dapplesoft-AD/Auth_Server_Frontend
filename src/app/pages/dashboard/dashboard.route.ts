import { Route } from '@angular/router'
import { PageLayout, setLayout } from '../../../libs/common-components'

export type DashboardRoutes = {
    user: Route
    profile: Route
    userLoginHistory: Route
    businesses: Route
    member: Route
    roles: Route
    permissions: Route
    rolePermissions: Route
    applications: Route
    tokens: Route
    emailVerifications: Route
    passwordResets: Route
    mfaSettings: Route
    mfaLogs: Route
    auditLogs: Route
}

export const dashboardRoutes: DashboardRoutes = {
    user: {
        path: 'admin/user',
        loadComponent: () =>
            import('./page-user/page-user.component').then(
                (m) => m.PageUserComponent,
            ),
        resolve: { layout: setLayout(PageLayout.Dashboard) },
    },
    profile: {
        path: 'admin/profile',
        loadComponent: () =>
            import('./page-user-profile/page-profile.component').then(
                (m) => m.PageProfileComponent,
            ),
        resolve: { layout: setLayout(PageLayout.Dashboard) },
    },
    userLoginHistory: {
        path: 'admin/user-Login-history',
        loadComponent: () =>
            import('./page-user-history/page-user-history.component').then(
                (m) => m.PageUserHistoryComponent,
            ),
        resolve: { layout: setLayout(PageLayout.Dashboard) },
    },
    businesses: {
        path: 'admin/businesses',
        loadComponent: () =>
            import('./page-businesses/page-businesses.component').then(
                (m) => m.PageBusinessesComponent,
            ),
        resolve: { layout: setLayout(PageLayout.Dashboard) },
    },
    member: {
        path: 'admin/member',
        loadComponent: () =>
            import('./page-member/page-member.component').then(
                (m) => m.PageMemberComponent,
            ),
        resolve: { layout: setLayout(PageLayout.Dashboard) },
    },
    roles: {
        path: 'admin/roles',
        loadComponent: () =>
            import('./page-roles/page-roles.component').then(
                (m) => m.PageRolesComponent,
            ),
        resolve: { layout: setLayout(PageLayout.Dashboard) },
    },
    permissions: {
        path: 'admin/permissions',
        loadComponent: () =>
            import('./page-permissions/page-permissions.component').then(
                (m) => m.PagePermissionsComponent,
            ),
        resolve: { layout: setLayout(PageLayout.Dashboard) },
    },
    rolePermissions: {
        path: 'admin/role-permissions',
        loadComponent: () =>
            import(
                './page-rolePermissions/page-rolePermissions.component'
            ).then((m) => m.RolePermissionsRoutes),
        resolve: { layout: setLayout(PageLayout.Dashboard) },
    },
    applications: {
        path: 'admin/applications',
        loadComponent: () =>
            import('./page-applications/page-applications.component').then(
                (m) => m.PageApplicationsComponent,
            ),
        resolve: { layout: setLayout(PageLayout.Dashboard) },
    },

    tokens: {
        path: 'admin/tokens',
        loadComponent: () =>
            import('./page-tokens/page-tokens.component').then(
                (m) => m.PageTokensComponent,
            ),
        resolve: { layout: setLayout(PageLayout.Dashboard) },
    },
    emailVerifications: {
        path: 'admin/emailVerifications',
        loadComponent: () =>
            import(
                './page-emailVerifications/page-emailVerifications.component'
            ).then((m) => m.PageEmailVerificationsComponent),
        resolve: { layout: setLayout(PageLayout.Dashboard) },
    },
    passwordResets: {
        path: 'admin/password-resets',
        loadComponent: () =>
            import('./page-passwordResets/page-passwordResets.component').then(
                (m) => m.PagePasswordResetsComponent,
            ),
        resolve: { layout: setLayout(PageLayout.Dashboard) },
    },
    mfaSettings: {
        path: 'admin/mfa-settings',
        loadComponent: () =>
            import('./page-mfaSettings/page-mfaSettings.component').then(
                (m) => m.PageMfaSettingsComponent,
            ),
        resolve: { layout: setLayout(PageLayout.Dashboard) },
    },
    mfaLogs: {
        path: 'admin/mfa-logs',
        loadComponent: () =>
            import('./page-mfaLogs/page-mfaLogs.component').then(
                (m) => m.PageMfaLogsRoutesComponent,
            ),
        resolve: { layout: setLayout(PageLayout.Dashboard) },
    },
    auditLogs: {
        path: 'admin/audit-logs',
        loadComponent: () =>
            import('./page-auditLogs/page-auditLogs.component').then(
                (m) => m.PageAuditLogsRoutesComponent,
            ),
        resolve: { layout: setLayout(PageLayout.Dashboard) },
    },
}
