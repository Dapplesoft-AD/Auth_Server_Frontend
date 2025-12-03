import { Route } from '@angular/router'
import { PageLayout, setLayout } from '../../../libs/common-components'

export type DashboardRoutes = {
    user: Route
    profile: Route
    userhistory: Route
    businesses: Route
    member: Route
    roles: Route
    permissions: Route
    rolepermissions: Route
    applications: Route
    tokens: Route
    emailVerifications: Route
    passwordresets: Route
    mfasettings: Route
    mfalogs: Route
    auditlogs: Route
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
    userhistory: {
        path: 'admin/userhistory',
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
    rolepermissions: {
        path: 'admin/rolepermissions',
        loadComponent: () =>
            import(
                './page-rolepermissions/page-rolepermissions.component'
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
    passwordresets: {
        path: 'admin/passwordresets',
        loadComponent: () =>
            import('./page-passwordresets/page-passwordresets.component').then(
                (m) => m.PagePasswordResetsComponent,
            ),
        resolve: { layout: setLayout(PageLayout.Dashboard) },
    },
    mfasettings: {
        path: 'admin/mfasettings',
        loadComponent: () =>
            import('./page-mfasettings/page-mfasettings.component').then(
                (m) => m.PageMfaSettingsComponent,
            ),
        resolve: { layout: setLayout(PageLayout.Dashboard) },
    },
    mfalogs: {
        path: 'admin/mfalogs',
        loadComponent: () =>
            import('./page-mfalogs/page-mfalogs.component').then(
                (m) => m.PageMfaLogsRoutesComponent,
            ),
        resolve: { layout: setLayout(PageLayout.Dashboard) },
    },
    auditlogs: {
        path: 'admin/auditlogs',
        loadComponent: () =>
            import('./page-auditlogs/page-auditlogs.component').then(
                (m) => m.PageAuditLogsRoutesComponent,
            ),
        resolve: { layout: setLayout(PageLayout.Dashboard) },
    },
}
