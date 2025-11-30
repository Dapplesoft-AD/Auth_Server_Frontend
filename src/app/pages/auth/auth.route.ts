import { Route } from '@angular/router'
import { PageLayout, setLayout } from '../../../libs/common-components'

export type AuthRoutes = {
    login: Route
    profile: Route
    reset: Route
    signup: Route
    verified: Route
    verifiedotp: Route
    todo: Route
}

export const authRoutes: AuthRoutes = {
    login: {
        path: 'login',
        pathMatch: 'full',
        loadComponent: () =>
            import('./page-login/page-login.component').then(
                (m) => m.PageLoginComponent,
            ),
        resolve: { layout: setLayout(PageLayout.Public) },
    },
    todo: {
        path: '',
        pathMatch: 'full',
        loadComponent: () =>
            import('../page-todo/page-todo.component').then(
                (m) => m.PageTodoComponent,
            ),
        resolve: { layout: setLayout(PageLayout.Public) },
    },
    profile: {
        path: 'profile',
        pathMatch: 'full',
        loadComponent: () =>
            import('./page-user-profile/page-user-profile.component').then(
                (m) => m.UserProfileComponent,
            ),
        resolve: { layout: setLayout(PageLayout.Public) },
    },
    reset: {
        path: 'reset',
        loadComponent: () =>
            import('./page-reset/page-reset.component').then(
                (m) => m.PageResetComponent,
            ),
        resolve: { layout: setLayout(PageLayout.Public) },
    },
    signup: {
        path: 'signup',
        loadComponent: () =>
            import('./page-signup/page-signup.component').then(
                (m) => m.PageSignupComponent,
            ),
        resolve: { layout: setLayout(PageLayout.Public) },
    },
    verified: {
        path: 'verified',
        loadComponent: () =>
            import('./page-verified/page-verified.component').then(
                (m) => m.PageVerifiedComponent,
            ),
        resolve: { layout: setLayout(PageLayout.Public) },
    },
    verifiedotp: {
        path: 'verifiedotp',
        loadComponent: () =>
            import('./page-verifiedotp/page-verifiedotp.component').then(
                (m) => m.PageVerifiedotpComponent,
            ),
        resolve: { layout: setLayout(PageLayout.Public) },
    },
}
