import { Route, Routes } from '@angular/router'

// import { adminLoginRoutes, AdminLoginRoutes } from './pages/dashboard-auth/admin-login/admin-login.routes'
// import { adminSignupRoutes, AdminSignupRoutes } from './pages/dashboard-auth/admin-signup.routes'
// import { adminForgetRoutes, AdminForgetRoutes } from './pages/dashboard-auth/admin-forget.routes'

import { AuthRoutes, authRoutes } from './pages/auth/auth.route'
import {
    DashboardRoutes,
    dashboardRoutes,
} from './pages/dashboard/dashboard.route'
import {
    NotFoundRoutes,
    notFoundRoutes,
} from './pages/not-found/not-found.routes'

type AppRouteGroups = [
    AuthRoutes,
    DashboardRoutes,
    // adminLoginRoutes,
    // adminSignupRoutes,
    // adminForgetRoutes,
    NotFoundRoutes,
]

const groupedRoutes: AppRouteGroups = [
    authRoutes,
    dashboardRoutes,
    // adminLoginRoutes,
    // adminSignupRoutes,
    // adminForgetRoutes,
    notFoundRoutes,
]

const flattenedRoutes: Route[] = []
for (const routeGroup of groupedRoutes) {
    for (const route of Object.values(routeGroup)) {
        flattenedRoutes.push(route)
    }
}

export const appRoutes = flattenedRoutes
