import { Component, inject, OnInit } from '@angular/core'
import { DialogService } from 'primeng/dynamicdialog'
import { PrimeModules } from '../../../../libs/prime-modules'
import {
    SmtpConfigStateService,
    SmtpConfigTableComponent,
} from '../../../../libs/smtp-config'

@Component({
    selector: 'app-page-smtp-config',
    imports: [SmtpConfigTableComponent, PrimeModules],
    templateUrl: './page-smtp-config.component.html',
    providers: [SmtpConfigStateService, DialogService], // Add DialogService here
})
export class PageSmtpConfigComponent implements OnInit {
    private smtpConfigStateService = inject(SmtpConfigStateService)

    ngOnInit() {
        this.smtpConfigStateService.init()
    }
    // Refresh data
    refresh() {
        this.smtpConfigStateService.loadConfigs()
    }
}
