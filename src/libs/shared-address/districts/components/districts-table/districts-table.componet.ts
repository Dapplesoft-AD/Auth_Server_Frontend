import { CommonModule } from '@angular/common'
import { Component, inject } from '@angular/core'
import { DialogService } from 'primeng/dynamicdialog'
import { AlertService } from '../../../../common-service/lib/alert.service'
import { PrimeModules } from '../../../../prime-modules'
import { District } from '../../districts.model'
import { DistrictListStateService } from '../../districts-state.service'
import { DistrictModalComponent } from '../districts-modal/districts-modal.component'

@Component({
    selector: 'app-district-table',
    imports: [CommonModule, PrimeModules],
    templateUrl: './districts-table.component.html',
    styleUrls: ['./districts-table.component.css'],
    providers: [DialogService],
})
export class DistrictTableComponent {
    protected districtListStateService = inject(DistrictListStateService)
    private dialogService = inject(DialogService)
    private alertService = inject(AlertService)

    ngOnInit(): void {
        this.districtListStateService.init()
    }
    addDistrict() {
        const ref = this.dialogService.open(DistrictModalComponent, {
            header: 'Add District',
            width: '50%',
            closable: true,
        })

        ref!.onClose.subscribe((district: District) => {
            if (district) {
                this.districtListStateService.init()
            }
        })
    }

    editDistrict(district: District) {
        const ref = this.dialogService.open(DistrictModalComponent, {
            header: 'Edit District',
            width: '50%',
            closable: true,
            data: { district },
        })

        ref!.onClose.subscribe((updatedDistrict: District) => {
            if (updatedDistrict) {
                this.districtListStateService.init()
            }
        })
    }

    deleteDistrict(district: District) {
        this.districtListStateService.deleteDistrict(district.id).subscribe({
            next: () => {
                this.alertService.success(
                    `District ${district.name} deleted successfully`,
                )
                this.districtListStateService.init()
            },
            error: () => {
                this.alertService.error('Delete failed')
            },
        })
    }
}
