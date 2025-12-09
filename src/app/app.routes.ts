import { Route } from '@angular/router'
import { authGuard } from '../libs/guards/auth/auth.guard'
import { AuthRoutes, authRoutes } from './pages/auth/auth.route'
import {
    DashboardRoutes,
    dashboardRoutes,
} from './pages/dashboard/dashboard.route'
import {
    NotFoundRoutes,
    notFoundRoutes,
} from './pages/not-found/not-found.routes'
import { AddressRoutes, addressRoutes } from './pages/shared-address/address'

type AppRouteGroups = [
    AuthRoutes,
    DashboardRoutes,
    AddressRoutes,
    NotFoundRoutes,
]

const groupedRoutes: AppRouteGroups = [
    authRoutes,
    dashboardRoutes,
    addressRoutes,
    notFoundRoutes,
]

const flattenedRoutes: Route[] = []

for (const routeGroup of groupedRoutes) {
    for (const route of Object.values(routeGroup)) {
        // Apply AuthGuard to dashboardRoutes
        if (routeGroup === dashboardRoutes) {
            route.canActivate = [...(route.canActivate ?? []), authGuard]
        }
        flattenedRoutes.push(route)
    }
}

export const appRoutes = flattenedRoutes
