import { Route, Routes } from '@angular/router'

// import { adminLoginRoutes, AdminLoginRoutes } from './pages/dashboard-auth/admin-login/admin-login.routes'
// import { adminSignupRoutes, AdminSignupRoutes } from './pages/dashboard-auth/admin-signup.routes'
// import { adminForgetRoutes, AdminForgetRoutes } from './pages/dashboard-auth/admin-forget.routes'

import { AuthRoutes, authRoutes } from './pages/auth/auth.route'
import {
    ApplicationsRoutes,
    applicationsRoutes,
} from './pages/dashboard/applications/applications.routes'
import {
    AuditLogsRoutes,
    auditlogsRoutes,
} from './pages/dashboard/auditlogs/auditlogs.routes'
import {
    BusinessesRoutes,
    businessesRoutes,
} from './pages/dashboard/business/businesses.routes'
import {
    MemberRoutes,
    memberRoutes,
} from './pages/dashboard/business-member/member.routes'
import {
    EmailVerificationsRoutes,
    emailVerificationssRoutes,
} from './pages/dashboard/emailverifications/emailVerifications.routes'
import {
    MfaLogsRoutes,
    mfalogsRoutes,
} from './pages/dashboard/mfalogs/mfalogs.routes'
import {
    MfaSettingsRoutes,
    mfasettingsRoutes,
} from './pages/dashboard/mfasettings/mfasettings.routes'
import {
    PasswordResetsRoutes,
    passwordresetsRoutes,
} from './pages/dashboard/passwordresets/passwordresets.routes'
import { PermissionsRoutes } from './pages/dashboard/permission/permissions.routes'
import { RolePermissionsRoutes } from './pages/dashboard/rolepermissions/rolepermissions.routes'
import { RolesRoutes, rolesRoutes } from './pages/dashboard/roles/roles.routes'
import {
    TokensRoutes,
    tokensRoutes,
} from './pages/dashboard/tokens/tokens.routes'
import {
    ProfileRoutes,
    profileRoutes,
} from './pages/dashboard/ueser-profile/profile.routes'
import { UserRoutes, userRoutes } from './pages/dashboard/user/user.routes'
import {
    UserHistoryRoutes,
    userhistoryRoutes,
} from './pages/dashboard/user-history/user-history.routes'
import {
    NotFoundRoutes,
    notFoundRoutes,
} from './pages/not-found/not-found.routes'

type AppRouteGroups = [
    AuthRoutes,
    UserRoutes,
    ProfileRoutes,
    UserHistoryRoutes,
    BusinessesRoutes,
    MemberRoutes,
    RolesRoutes,
    PermissionsRoutes,
    RolePermissionsRoutes,
    ApplicationsRoutes,
    TokensRoutes,
    EmailVerificationsRoutes,
    PasswordResetsRoutes,
    MfaSettingsRoutes,
    MfaLogsRoutes,
    AuditLogsRoutes,
    NotFoundRoutes,
]

const groupedRoutes: AppRouteGroups = [
    authRoutes,
    // adminLoginRoutes,
    // adminSignupRoutes,
    // adminForgetRoutes,
    userRoutes,
    profileRoutes,
    userhistoryRoutes,
    businessesRoutes,
    memberRoutes,
    rolesRoutes,
    PermissionsRoutes,
    RolePermissionsRoutes,
    applicationsRoutes,
    tokensRoutes,
    emailVerificationssRoutes,
    passwordresetsRoutes,
    mfasettingsRoutes,
    mfalogsRoutes,
    auditlogsRoutes,
    notFoundRoutes,
]

const flattenedRoutes: Route[] = []
for (const routeGroup of groupedRoutes) {
    for (const route of Object.values(routeGroup)) {
        flattenedRoutes.push(route)
    }
}

export const appRoutes = flattenedRoutes
