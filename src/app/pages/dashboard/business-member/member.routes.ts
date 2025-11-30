import { Route } from '@angular/router'
import { PageLayout, setLayout } from '../../../../libs/common-components'

export type MemberRoutes = {
    member: Route
}

export const memberRoutes: MemberRoutes = {
    member: {
        path: 'admin/member',
        loadComponent: () =>
            import('./page-member/page-member.component').then(
                (m) => m.PageMemberComponent,
            ),
        resolve: { layout: setLayout(PageLayout.Dashboard) },
    },
}
