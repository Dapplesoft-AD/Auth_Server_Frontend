import { AsyncPipe, CommonModule } from '@angular/common'
import { Component, inject } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { RouterOutlet } from '@angular/router'
import { NgxSonnerToaster } from 'ngx-sonner'
import { ConfirmDialog } from 'primeng/confirmdialog'
import { ConfirmPopup } from 'primeng/confirmpopup'
import { ToastModule } from 'primeng/toast'
import {
    LayoutDashboardComponent,
    LayoutPublicComponent,
    PageLayout,
    PageLayoutService,
    PublicFooterComponent,
} from '../libs/common-components'

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        RouterOutlet,
        AsyncPipe,
        LayoutPublicComponent,
        LayoutDashboardComponent,
        ConfirmDialog,
        NgxSonnerToaster,
        ConfirmPopup,
        ToastModule,
        PublicFooterComponent,
    ],
    templateUrl: './app.component.html',
})
export class AppComponent {
    readonly PageLayout = PageLayout
    protected layoutService = inject(PageLayoutService)
}
