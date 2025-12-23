import { CommonModule } from '@angular/common'
import { Component, inject, signal } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog'
import { FormInputComponent } from '../../../common-components/form/form-input/form-input.component'
import { AlertService } from '../../../common-service/lib/alert.service'
import { PrimeModules } from '../../../prime-modules'
import { Application, ApplicationDto } from '../../application.model'
import { ApplicationApiService } from '../../application-api.service'
import { ApplicationFormService } from '../../application-form.service'

@Component({
    selector: 'app-application-modal',
    imports: [
        CommonModule,
        PrimeModules,
        FormsModule,
        ReactiveFormsModule,
        FormInputComponent,
    ],
    templateUrl: './application-modal.component.html',
    styleUrl: './application-modal.component.css',
})
export class ApplicationModalComponent {
    protected appFormService = inject(ApplicationFormService)
    private appApiService = inject(ApplicationApiService)
    private alertService = inject(AlertService)
    private ref = inject(DynamicDialogRef)
    private config = inject(DynamicDialogConfig)

    isLoading = signal(false)
    isEditMode = signal(false)
    private applicationId?: string

    constructor() {
        this.initializeForm()
    }

    private initializeForm() {
        const application: Application | undefined =
            this.config.data?.application

        if (application) {
            this.isEditMode.set(true)
            this.applicationId = application.clientId
            this.appFormService.form.patchValue({
                displayName: application.displayName,
                clientId: application.clientId,
                clientSecret: application.clientSecret,
                redirectUris: application.redirectUris,
            })
        } else {
            this.isEditMode.set(false)
            this.applicationId = undefined
            this.appFormService.form.reset()
        }
    }

    submit(event: Event) {
        event.preventDefault()
        if (this.appFormService.form.invalid) return

        this.isLoading.set(true)
        const formValue = this.appFormService.getValue()

        // Convert comma-separated string to array
        let redirectUrisArray: string[] = []
        if (formValue.redirectUris) {
            redirectUrisArray = formValue.redirectUris
                .split(',')
                .map((uri) => uri.trim())
                .filter((uri) => uri.length > 0) // Remove empty entries
        }

        const applicationData: ApplicationDto = {
            clientId: formValue.clientId!,
            clientSecret: formValue.clientSecret!,
            displayName: formValue.displayName!,
            redirectUris: redirectUrisArray,
        }

        this.isEditMode()
            ? this.updateApplication(applicationData)
            : this.createApplication(applicationData)
    }

    private createApplication(application: ApplicationDto) {
        this.appApiService.createApplication(application).subscribe({
            next: (res) => {
                this.isLoading.set(false)
                this.ref.close(res)
                this.alertService.success('Project created successfully')
            },
            error: () => {
                this.isLoading.set(false)
                this.alertService.error('Failed to create project')
            },
        })
    }

    private updateApplication(application: ApplicationDto) {
        if (!this.applicationId) return

        this.appApiService
            .updateApplication(this.applicationId, application)
            .subscribe({
                next: (res) => {
                    this.isLoading.set(false)
                    this.ref.close(res)
                    this.alertService.success('Project updated successfully')
                },
                error: () => {
                    this.isLoading.set(false)
                    this.alertService.error('Failed to update project')
                },
            })
    }
}
