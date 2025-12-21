import { CommonModule } from '@angular/common'
import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog'
import { AlertService } from '../../../common-service/lib/alert.service'
import { PrimeModules } from '../../../prime-modules'
import { SmtpConfig, SmtpConfigDto } from '../../smtp-config.model'
import { SmtpConfigFormService } from '../../smtp-config-form.service'
import { SmtpConfigStateService } from '../../smtp-config-state.service'
//'./smtp-config-modal.component.html'
@Component({
    selector: 'app-smtp-config-modal',
    imports: [CommonModule, PrimeModules, FormsModule, ReactiveFormsModule],
    templateUrl: './smtp-config-modal.component.html',
    // REMOVE providers - service will be injected from parent
})
export class SmtpConfigModalComponent implements OnInit, OnDestroy {
    protected smtpConfigFormService = inject(SmtpConfigFormService)
    private smtpConfigStateService = inject(SmtpConfigStateService)
    private alertService = inject(AlertService)
    private ref = inject(DynamicDialogRef)
    private dialogConfig = inject(DynamicDialogConfig)

    isLoading = signal<boolean>(false)
    isTesting = signal<boolean>(false)
    isEditMode = false
    modalTitle = 'Add SMTP Configuration'

    ngOnInit() {
        const configData = this.dialogConfig.data as SmtpConfig
        if (configData) {
            this.isEditMode = true
            this.modalTitle = 'Edit SMTP Configuration'
            this.smtpConfigFormService.patchForm(configData)
        } else {
            this.smtpConfigFormService.reset()
        }
    }

    ngOnDestroy() {
        this.smtpConfigFormService.reset()
    }

    submit(event: Event) {
        event.preventDefault()

        if (this.smtpConfigFormService.form.invalid) {
            this.markFormAsTouched()
            this.alertService.warn('Please fill all required fields correctly')
            return
        }

        this.isLoading.set(true)
        const formValue = this.smtpConfigFormService.getValue()

        if (this.isEditMode) {
            const id = this.smtpConfigFormService.getCurrentId()
            if (id) {
                this.updateConfig(id, formValue)
            }
        } else {
            this.createConfig(formValue)
        }
    }

    private createConfig(config: SmtpConfigDto) {
        this.smtpConfigStateService.createConfig(config).subscribe({
            next: (response) => {
                this.isLoading.set(false)
                this.alertService.success(
                    'SMTP configuration created successfully!',
                )
                this.ref.close(response)
            },
            error: (error) => {
                this.isLoading.set(false)
                this.alertService.error(
                    error.message || 'Failed to create configuration',
                )
            },
        })
    }

    private updateConfig(id: string, config: SmtpConfigDto) {
        this.smtpConfigStateService.updateConfig(id, config).subscribe({
            next: (response) => {
                this.isLoading.set(false)
                this.alertService.success(
                    'SMTP configuration updated successfully!',
                )
                this.ref.close(response)
            },
            error: (error) => {
                this.isLoading.set(false)
                this.alertService.error(
                    error.message || 'Failed to update configuration',
                )
            },
        })
    }

    testConnection() {
        if (this.smtpConfigFormService.form.invalid) {
            this.markFormAsTouched()
            this.alertService.warn(
                'Please fill all required fields before testing',
            )
            return
        }

        this.isTesting.set(true)
        const formValue = this.smtpConfigFormService.getValue()

        this.smtpConfigStateService.testConnection(formValue).subscribe({
            next: (result) => {
                this.isTesting.set(false)
                const testResult =
                    this.smtpConfigStateService.getState().testResult
                if (testResult?.success) {
                    this.alertService.success(testResult.message)
                } else {
                    this.alertService.error(
                        testResult?.message || 'Connection test failed',
                    )
                }
            },
            error: (error) => {
                this.isTesting.set(false)
                this.alertService.error('Connection test failed')
            },
        })
    }

    sendTestEmail() {
        if (this.smtpConfigFormService.form.invalid) {
            this.markFormAsTouched()
            this.alertService.warn(
                'Please fill all required fields before sending test email',
            )
            return
        }

        const recipientEmail = prompt('Enter recipient email address:', '')
        if (!recipientEmail) return

        this.isTesting.set(true)

        if (this.isEditMode) {
            this.smtpConfigStateService
                .sendTestEmail(recipientEmail)
                .subscribe({
                    next: () => {
                        this.isTesting.set(false)
                        const testResult =
                            this.smtpConfigStateService.getState().testResult
                        if (testResult?.success) {
                            this.alertService.success(
                                `Test email sent to ${recipientEmail}`,
                            )
                        } else {
                            this.alertService.error(
                                testResult?.message ||
                                    'Failed to send test email',
                            )
                        }
                    },
                    error: (error) => {
                        this.isTesting.set(false)
                        this.alertService.error('Failed to send test email')
                    },
                })
        } else {
            // For new config, create it first
            const formValue = this.smtpConfigFormService.getValue()
            this.smtpConfigStateService.createConfig(formValue).subscribe({
                next: () => {
                    this.smtpConfigStateService
                        .sendTestEmail(recipientEmail)
                        .subscribe({
                            next: () => {
                                this.isTesting.set(false)
                                this.alertService.success(
                                    `Test email sent to ${recipientEmail}`,
                                )
                            },
                            error: (error) => {
                                this.isTesting.set(false)
                                this.alertService.error(
                                    'Failed to send test email',
                                )
                            },
                        })
                },
                error: (error) => {
                    this.isTesting.set(false)
                    this.alertService.error('Failed to save configuration')
                },
            })
        }
    }

    private markFormAsTouched() {
        Object.keys(this.smtpConfigFormService.form.controls).forEach((key) => {
            const control = this.smtpConfigFormService.form.get(key)
            control?.markAsTouched()
        })
    }
}
