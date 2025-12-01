import { Route, Routes } from '@angular/router'
import { AuthRoutes, authRoutes } from './pages/auth/auth.route'
import {
    DashboardRoutes,
    dashboardRoutes,
} from './pages/dashboard/dashboard.route'
import {
    NotFoundRoutes,
    notFoundRoutes,
} from './pages/not-found/not-found.routes'

type AppRouteGroups = [AuthRoutes, DashboardRoutes, NotFoundRoutes]

const groupedRoutes: AppRouteGroups = [
    authRoutes,
    dashboardRoutes,
    notFoundRoutes,
]

const flattenedRoutes: Route[] = []
for (const routeGroup of groupedRoutes) {
    for (const route of Object.values(routeGroup)) {
        flattenedRoutes.push(route)
    }
}

export const appRoutes = flattenedRoutes
