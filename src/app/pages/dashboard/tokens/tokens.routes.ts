import { Route } from '@angular/router'
import { PageLayout, setLayout } from '../../../../libs/common-components'
import { authGuard } from '../../../../libs/guards/auth/auth.guard'

export type TokensRoutes = {
    tokens: Route
}

export const tokensRoutes: TokensRoutes = {
    tokens: {
        path: 'admin/tokens',
        canActivate: [authGuard],
        loadComponent: () =>
            import('./page-tokens/page-tokens.component').then(
                (m) => m.PageTokensComponent,
            ),
        resolve: { layout: setLayout(PageLayout.Dashboard) },
    },
}
