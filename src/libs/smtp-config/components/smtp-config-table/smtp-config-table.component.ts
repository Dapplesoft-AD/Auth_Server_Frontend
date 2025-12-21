import { CommonModule } from '@angular/common'
import { Component, inject, OnDestroy, OnInit } from '@angular/core'
import { ConfirmationService } from 'primeng/api'
import { DialogService } from 'primeng/dynamicdialog'
import { AlertService } from '../../../common-service/lib/alert.service'
import { PrimeModules } from '../../../prime-modules'
import { SmtpConfig } from '../../smtp-config.model'
import { SmtpConfigStateService } from '../../smtp-config-state.service'
import { SmtpConfigModalComponent } from '../smtp-config-modal/smtp-config-modal.component'

@Component({
    selector: 'app-smtp-config-table',
    imports: [CommonModule, PrimeModules], // Remove TooltipModule if not used
    templateUrl: './smtp-config-table.component.html',
})
export class SmtpConfigTableComponent implements OnInit, OnDestroy {
    private smtpConfigStateService = inject(SmtpConfigStateService)
    private dialogService = inject(DialogService)
    private confirmationService = inject(ConfirmationService)
    private alertService = inject(AlertService)

    state$ = this.smtpConfigStateService.selectAll()
    loading$ = this.smtpConfigStateService.select('loading')

    ngOnInit() {
        console.log('SmtpConfigTableComponent: Initializing...')
        this.loadConfigs()
    }

    ngOnDestroy() {
        this.smtpConfigStateService.clearTestResult()
    }

    loadConfigs() {
        console.log('SmtpConfigTableComponent: Loading configs...')
        this.smtpConfigStateService.loadConfigs().subscribe({
            next: (configs) => {
                console.log(
                    'SmtpConfigTableComponent: Configs loaded:',
                    configs,
                )
            },
            error: (error) => {
                console.error(
                    'SmtpConfigTableComponent: Failed to load configs:',
                    error,
                )
                this.alertService.error('Failed to load SMTP configurations')
            },
        })
    }

    addConfig() {
        console.log('SmtpConfigTableComponent: addConfig() called')

        // Simple test first
        alert('Add Config button clicked! If you see this, the button works.')

        // Then try opening the dialog
        try {
            console.log('Opening SmtpConfigModalComponent...')
            const ref = this.dialogService.open(SmtpConfigModalComponent, {
                header: 'Add SMTP Configuration',
                width: '50%',
                closable: true,
                modal: true,
                dismissableMask: true,
            })

            console.log('Dialog ref:', ref)

            if (ref) {
                ref.onClose.subscribe({
                    next: (result) => {
                        console.log('Modal closed with result:', result)
                        this.loadConfigs()
                    },
                    error: (error) => {
                        console.error('Modal error:', error)
                    },
                })
            }
        } catch (error) {
            console.error('Error opening modal:', error)
            this.alertService.error(
                'Failed to open configuration dialog: ' + error,
            )
        }
    }

    // smtp-config-table.component.ts
    deleteConfig(config: SmtpConfig) {
        this.confirmationService.confirm({
            message: `Are you sure you want to delete configuration for ${config.host}?`,
            header: 'Confirm Deletion',
            icon: 'pi pi-exclamation-triangle',
            acceptButtonStyleClass: 'p-button-danger p-button-text',
            rejectButtonStyleClass: 'p-button-text p-button-text',
            acceptIcon: 'pi pi-check',
            rejectIcon: 'pi pi-times',
            accept: () => {
                // Use config.smtpId instead of config.id
                this.smtpConfigStateService
                    .deleteConfig(config.smtpId)
                    .subscribe({
                        next: () => {
                            this.alertService.success(
                                'Configuration deleted successfully',
                            )
                        },
                        error: (error) => {
                            this.alertService.error(
                                'Failed to delete configuration',
                            )
                        },
                    })
            },
        })
    }

    editConfig(config: SmtpConfig) {
        console.log('Edit config:', config)

        const ref = this.dialogService.open(SmtpConfigModalComponent, {
            header: 'Edit SMTP Configuration',
            width: '50%',
            closable: true,
            modal: true,
            data: config,
        })

        ref?.onClose.subscribe(() => {
            this.loadConfigs()
        })
    }

    sendTestEmail(config: SmtpConfig) {
        const recipientEmail = prompt('Enter recipient email address:', '')
        if (!recipientEmail) return

        this.smtpConfigStateService.sendTestEmail(recipientEmail).subscribe({
            next: () => {
                const testResult =
                    this.smtpConfigStateService.getState().testResult
                if (testResult?.success) {
                    this.alertService.success(
                        `Test email sent to ${recipientEmail}`,
                    )
                } else {
                    this.alertService.error(
                        testResult?.message || 'Failed to send test email',
                    )
                }
            },
            error: (error) => {
                this.alertService.error('Failed to send test email')
            },
        })
    }
}
