import { CommonModule } from '@angular/common'
import { Component, inject } from '@angular/core'
import { DialogService } from 'primeng/dynamicdialog'
import { AlertService } from '../../../../common-service/lib/alert.service'
import { PrimeModules } from '../../../../prime-modules'
import { Region } from '../../regions.model'
import { RegionListStateService } from '../../regions-state.service'
import { RegionModalComponent } from '../regions-modal/regions-modal.component'

@Component({
    selector: 'app-region-table',
    standalone: true,
    imports: [CommonModule, PrimeModules],
    templateUrl: './regions-table.component.html',
    providers: [DialogService],
})
export class RegionTableComponent {
    protected regionListStateService = inject(RegionListStateService)
    private dialogService = inject(DialogService)
    private alertService = inject(AlertService)

    addRegion() {
        const ref = this.dialogService.open(RegionModalComponent, {
            header: 'Add Region',
            width: '50%',
            closable: true,
        })

        ref?.onClose.subscribe((region) => {
            if (region) {
                this.regionListStateService.init()
            }
        })
    }

    editRegion(region: Region) {
        const ref = this.dialogService.open(RegionModalComponent, {
            header: 'Edit Region',
            width: '50%',
            closable: true,
            data: { region },
        })

        ref?.onClose.subscribe((updated) => {
            if (updated) {
                this.regionListStateService.init()
            }
        })
    }

    confirmDelete(region: Region) {
        this.regionListStateService.deleteRegion(region.id).subscribe({
            next: () =>
                this.alertService.success('Region deleted successfully'),
            error: () => this.alertService.error('Failed to delete region'),
        })
    }
}
