import { CommonModule } from '@angular/common'
import { Component, inject } from '@angular/core'
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog'
import { AlertService } from '../../../../common-service/lib/alert.service'
import { PrimeModules } from '../../../../prime-modules'
import { Localitie } from '../../localities.model'
import { LocalitieListStateService } from '../../localities-state.service'
import { LocalitieModalComponent } from '../localities-modal/localities-modal.component'

@Component({
    selector: 'app-localities-table',
    standalone: true,
    imports: [CommonModule, PrimeModules, DynamicDialogModule],
    templateUrl: './localities-table.component.html',
    styleUrl: './localities-table.component.css',
    providers: [DialogService],
})
export class LocalitieTableComponent {
    protected localitieListStateService = inject(LocalitieListStateService)
    private dialogService = inject(DialogService)
    private alertService = inject(AlertService)

    addLocalitie() {
        const ref = this.dialogService.open(LocalitieModalComponent, {
            header: 'Add Locality',
            width: '50%',
            closable: true,
        })
        ref?.onClose.subscribe((localitie) => {
            if (localitie) {
                this.localitieListStateService.init()
            }
        })
    }

    editLocalitie(localitie: Localitie) {
        const ref = this.dialogService.open(LocalitieModalComponent, {
            header: 'Edit Locality',
            width: '50%',
            closable: true,
            data: { localitie },
        })

        ref?.onClose.subscribe((localitie) => {
            if (localitie) {
                this.localitieListStateService.init()
            }
        })
    }

    deleteLocalitie(localitie: Localitie) {
        this.localitieListStateService.deleteLocalitie(localitie.id).subscribe({
            next: () =>
                this.alertService.success('Locality deleted successfully'),
            error: () => this.alertService.error('Failed to delete locality'),
        })
    }
}
