import { Route } from '@angular/router'
import { PageLayout, setLayout } from '../../../../libs/common-components'

export type EmailVerificationsRoutes = {
    emailVerifications: Route
}

export const emailVerificationssRoutes: EmailVerificationsRoutes = {
    emailVerifications: {
        path: 'admin/emailVerifications',
        loadComponent: () =>
            import(
                './page-emailVerifications/page-emailVerifications.component'
            ).then((m) => m.PageEmailVerificationsComponent),
        resolve: { layout: setLayout(PageLayout.Dashboard) },
    },
}
