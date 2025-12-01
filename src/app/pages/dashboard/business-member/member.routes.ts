import { Route } from '@angular/router'
import { PageLayout, setLayout } from '../../../../libs/common-components'
import { authGuard } from '../../../../libs/guards/auth/auth.guard'

export type MemberRoutes = {
    member: Route
}

export const memberRoutes: MemberRoutes = {
    member: {
        path: 'admin/member',
        canActivate: [authGuard],
        loadComponent: () =>
            import('./page-member/page-member.component').then(
                (m) => m.PageMemberComponent,
            ),
        resolve: { layout: setLayout(PageLayout.Dashboard) },
    },
}
