import { CommonModule } from '@angular/common'
import { Component, inject } from '@angular/core'
import { ConfirmationService } from 'primeng/api'
import { DialogService } from 'primeng/dynamicdialog'
import { AlertService } from '../../../common-service/lib/alert.service'
import { PrimeModules } from '../../../prime-modules'
import { Application } from '../../application.model'
import { ApplicationListStateService } from '../../application-state.service'
import { ApplicationModalComponent } from '../application-modal/application-modal.component'

@Component({
    selector: 'app-application-table',
    imports: [CommonModule, PrimeModules],
    templateUrl: './application-table.component.html',
    styleUrl: './application-table.component.css',
})
export class ApplicationTableComponent {
    protected appListStateService = inject(ApplicationListStateService)
    private dialogService = inject(DialogService)
    private confirmationService = inject(ConfirmationService)
    private alertService = inject(AlertService)

    addApplication() {
        const ref = this.dialogService.open(ApplicationModalComponent, {
            header: 'Add Application',
            width: '50%',
            closable: true,
        })
        ref?.onClose.subscribe((application) => {
            if (application) {
                this.appListStateService.init()
            }
        })
    }

    editApplication(application: Application) {
        const ref = this.dialogService.open(ApplicationModalComponent, {
            header: 'Edit project',
            width: '50%',
            closable: true,
            data: { application },
        })

        ref?.onClose.subscribe((updatedApplication) => {
            if (updatedApplication) {
                this.appListStateService.init()
            }
        })
    }

    confirmDeleteApplication(application: Application) {
        this.confirmationService.confirm({
            header: 'Delete Confirmation',
            message: `Are you sure you want to delete '${application.displayName}'?`,
            accept: () => {
                this.appListStateService
                    .deleteApplication(application.clientId)
                    .subscribe({
                        next: () => {
                            this.alertService.success(
                                `Application '${application.displayName}' deleted successfully`,
                            )
                        },
                        error: (err) => {
                            console.error('Delete user failed:', err)
                            this.alertService.error('Delete user failed')
                        },
                    })
            },
        })
    }
}
