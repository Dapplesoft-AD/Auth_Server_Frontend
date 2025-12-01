import { Route } from '@angular/router'
import { PageLayout, setLayout } from '../../../../libs/common-components'
import { authGuard } from '../../../../libs/guards/auth/auth.guard'

export type MfaSettingsRoutes = {
    mfasettings: Route
}

export const mfasettingsRoutes: MfaSettingsRoutes = {
    mfasettings: {
        path: 'admin/mfasettings',
        canActivate: [authGuard],
        loadComponent: () =>
            import('./page-mfasettings/page-mfasettings.component').then(
                (m) => m.PageMfaSettingsComponent,
            ),
        resolve: { layout: setLayout(PageLayout.Dashboard) },
    },
}
