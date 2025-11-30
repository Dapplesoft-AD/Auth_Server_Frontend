import { AsyncPipe, CommonModule } from '@angular/common'
import { Component, inject } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { RouterOutlet } from '@angular/router'
import { NgxSonnerToaster } from 'ngx-sonner'
import { ConfirmDialog } from 'primeng/confirmdialog'
import { ConfirmPopup } from 'primeng/confirmpopup'
import {
    LayoutDashboardComponent,
    LayoutPublicComponent,
    PageLayout,
    PageLayoutService,
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
    ],
    templateUrl: './app.component.html',
})
export class AppComponent {
    readonly PageLayout = PageLayout
    protected layoutService = inject(PageLayoutService)
}
