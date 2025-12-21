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

    // Observables for template
    state$ = this.smtpConfigStateService.selectAll()
    loading$ = this.smtpConfigStateService.select('loading')

    // Stats for dashboard
    stats = {
        totalConfigs: 0,
        activeConfigs: 0,
        lastTestStatus: 'Not Tested',
    }

    ngOnInit() {
        // Load configurations on init
        this.loadConfigs()

        // Subscribe to state changes
        this.state$.subscribe((state) => {
            this.updateStats(state)
        })
    }

    loadConfigs() {
        this.smtpConfigStateService.loadConfigs().subscribe({
            error: (error) => {
                console.error('Failed to load SMTP configurations:', error)
            },
        })
    }

    updateStats(state: any) {
        const configs = state.configs || []

        this.stats = {
            totalConfigs: configs.length,
            activeConfigs: configs.filter((c: any) => c.isActive).length,
            lastTestStatus:
                configs.length > 0 && configs[0].lastTested
                    ? 'Success'
                    : 'Not Tested',
        }
    }

    // Refresh data
    refresh() {
        this.loadConfigs()
    }
}
