import { Route } from '@angular/router'
import { PageLayout, setLayout } from '../../../../libs/common-components'

export type TokensRoutes = {
    tokens: Route
}

export const tokensRoutes: TokensRoutes = {
    tokens: {
        path: 'admin/tokens',
        loadComponent: () =>
            import('./page-tokens/page-tokens.component').then(
                (m) => m.PageTokensComponent,
            ),
        resolve: { layout: setLayout(PageLayout.Dashboard) },
    },
}
