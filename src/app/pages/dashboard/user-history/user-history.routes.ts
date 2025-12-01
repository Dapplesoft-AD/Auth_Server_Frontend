import { Route } from '@angular/router'
import { PageLayout, setLayout } from '../../../../libs/common-components'
import { authGuard } from '../../../../libs/guards/auth/auth.guard'

export type UserHistoryRoutes = {
    userhistory: Route
}

export const userhistoryRoutes: UserHistoryRoutes = {
    userhistory: {
        path: 'admin/userhistory',
        canActivate: [authGuard],
        loadComponent: () =>
            import('./page-user-history/page-user-history.component').then(
                (m) => m.PageUserHistoryComponent,
            ),
        resolve: { layout: setLayout(PageLayout.Dashboard) },
    },
}
