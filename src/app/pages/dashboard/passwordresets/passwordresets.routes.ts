import { Route } from '@angular/router'
import { PageLayout, setLayout } from '../../../../libs/common-components'
import { authGuard } from '../../../../libs/guards/auth/auth.guard'

export type PasswordResetsRoutes = {
    passwordresets: Route
}

export const passwordresetsRoutes: PasswordResetsRoutes = {
    passwordresets: {
        path: 'admin/passwordresets',
        canActivate: [authGuard],
        loadComponent: () =>
            import('./page-passwordresets/page-passwordresets.component').then(
                (m) => m.PagePasswordResetsComponent,
            ),
        resolve: { layout: setLayout(PageLayout.Dashboard) },
    },
}
