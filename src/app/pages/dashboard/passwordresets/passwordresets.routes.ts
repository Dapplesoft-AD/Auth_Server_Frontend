import { Route } from '@angular/router'
import { PageLayout, setLayout } from '../../../../libs/common-components'

export type PasswordResetsRoutes = {
    passwordresets: Route
}

export const passwordresetsRoutes: PasswordResetsRoutes = {
    passwordresets: {
        path: 'admin/passwordresets',
        loadComponent: () =>
            import('./page-passwordresets/page-passwordresets.component').then(
                (m) => m.PagePasswordResetsComponent,
            ),
        resolve: { layout: setLayout(PageLayout.Dashboard) },
    },
}
