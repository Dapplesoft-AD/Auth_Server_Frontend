import { CommonModule } from '@angular/common'
import { Component, inject } from '@angular/core'
import { DialogService } from 'primeng/dynamicdialog'
import { AlertService } from '../../../../common-service/lib/alert.service'
import { PrimeModules } from '../../../../prime-modules'
import { Area } from '../../areas.model'
import { AreaListStateService } from '../../areas-state.service'
import { AreaModalComponent } from '../areas-modal/areas-modal.component'

@Component({
    selector: 'app-area-table',
    imports: [CommonModule, PrimeModules],
    templateUrl: './areas-table.component.html',
    styleUrl: './areas-table.component.css',
})
export class AreaTableComponent {
    protected areaListStateService = inject(AreaListStateService)
    private dialogService = inject(DialogService)
    private alertService = inject(AlertService)

    addArea() {
        const ref = this.dialogService.open(AreaModalComponent, {
            header: 'Add Area',
            width: '50%',
            closable: true,
        })

        ref?.onClose.subscribe((area) => {
            if (area) {
                this.areaListStateService.init()
            }
        })
    }

    editArea(area: Area) {
        const ref = this.dialogService.open(AreaModalComponent, {
            header: 'Edit Area',
            width: '50%',
            closable: true,
            data: { area },
        })

        ref?.onClose.subscribe((updatedArea) => {
            if (updatedArea) {
                this.areaListStateService.init()
            }
        })
    }

    confirmDelete(area: Area) {
        this.areaListStateService.deleteArea(area.id).subscribe({
            next: () => {
                this.alertService.success(
                    `Area ${area.name} deleted successfully`,
                )
            },
            error: () => {
                this.alertService.error('Failed to delete area')
            },
        })
    }
}
