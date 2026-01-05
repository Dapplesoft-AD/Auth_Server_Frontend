import { Route } from '@angular/router'
import { adminGuard } from '../libs/guards/admin/admin.guard'
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
import { PublicRoutes, publicRoutes } from './pages/public/public.route'
import { AddressRoutes, addressRoutes } from './pages/shared-address/address'

type AppRouteGroups = [
    AuthRoutes,
    DashboardRoutes,
    AddressRoutes,
    PublicRoutes,
    NotFoundRoutes,
]

const groupedRoutes: AppRouteGroups = [
    authRoutes,
    dashboardRoutes,
    addressRoutes,
    publicRoutes,
    notFoundRoutes,
]

const flattenedRoutes: Route[] = []

for (const routeGroup of groupedRoutes) {
    for (const route of Object.values(routeGroup)) {
        // Apply AuthGuard to dashboardRoutes, address, public user
        if (
            routeGroup === dashboardRoutes ||
            routeGroup === addressRoutes ||
            routeGroup === publicRoutes
        ) {
            route.canActivate = [...(route.canActivate ?? []), authGuard]
        }
        // Apply AdminGuard
        if (routeGroup === dashboardRoutes || routeGroup === addressRoutes) {
            route.canActivate = [...(route.canActivate ?? []), adminGuard]
        }
        flattenedRoutes.push(route)
    }
}

export const appRoutes = flattenedRoutes
