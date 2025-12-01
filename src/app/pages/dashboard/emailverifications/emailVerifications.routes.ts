import { Route } from '@angular/router'
import { PageLayout, setLayout } from '../../../../libs/common-components'
import { authGuard } from '../../../../libs/guards/auth/auth.guard'

export type EmailVerificationsRoutes = {
    emailVerifications: Route
}

export const emailVerificationssRoutes: EmailVerificationsRoutes = {
    emailVerifications: {
        path: 'admin/emailVerifications',
        canActivate: [authGuard],
        loadComponent: () =>
            import(
                './page-emailVerifications/page-emailVerifications.component'
            ).then((m) => m.PageEmailVerificationsComponent),
        resolve: { layout: setLayout(PageLayout.Dashboard) },
    },
}
