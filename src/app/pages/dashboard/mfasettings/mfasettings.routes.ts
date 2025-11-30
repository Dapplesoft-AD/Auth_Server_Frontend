import { Route } from '@angular/router'
import { PageLayout, setLayout } from '../../../../libs/common-components'

export type MfaSettingsRoutes = {
    mfasettings: Route
}

export const mfasettingsRoutes: MfaSettingsRoutes = {
    mfasettings: {
        path: 'admin/mfasettings',
        loadComponent: () =>
            import('./page-mfasettings/page-mfasettings.component').then(
                (m) => m.PageMfaSettingsComponent,
            ),
        resolve: { layout: setLayout(PageLayout.Dashboard) },
    },
}
