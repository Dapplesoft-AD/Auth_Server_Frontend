import { CommonModule } from '@angular/common'
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    inject,
} from '@angular/core'
import { ConfirmationService } from 'primeng/api'
import { ButtonModule } from 'primeng/button'
import { ConfirmDialogModule } from 'primeng/confirmdialog'
import { DialogService } from 'primeng/dynamicdialog'
import { IconFieldModule } from 'primeng/iconfield'
import { InputIconModule } from 'primeng/inputicon'
import { InputTextModule } from 'primeng/inputtext'
import { TableModule } from 'primeng/table'
import { AlertService } from '../../../../common-service/lib/alert.service'
import { District } from '../../districts.model'
import { DistrictStateService } from '../../districts-state.service'
import { DistrictModalComponent } from '../districts-modal/districts-modal.component'
@Component({
    selector: 'app-district-table',
    imports: [
        CommonModule,
        TableModule,
        IconFieldModule,
        ButtonModule,
        InputIconModule,
        InputTextModule,
        ConfirmDialogModule,
    ],
    standalone: true,
    templateUrl: './districts-table.component.html',
    styleUrl: './districts-table.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [DialogService],
})
export class DistrictTableComponent {
    district: District[] = []
    isLoading = false

    private districtState = inject(DistrictStateService)
    private cdr = inject(ChangeDetectorRef)
    private dialogService = inject(DialogService)
    private alertService = inject(AlertService)
    private confirmationService = inject(ConfirmationService)

    ngOnInit(): void {
        this.isLoading = true
        this.districtState.district$.subscribe({
            next: (data) => {
                this.district = data
                console.log(data)
                this.isLoading = false
                this.cdr.markForCheck()
            },
        })
        this.districtState.loadDistrict()
    }

    openModal(district?: District) {
        this.dialogService.open(DistrictModalComponent, {
            header: district ? 'Edit District' : 'Add District',
            data: { district },
            width: '50%',
            closable: true,
            baseZIndex: 10000,
        })
    }
    deleteDistrict(district: District) {
        this.confirmationService.confirm({
            header: 'Delete Confirmation',
            message: `Are you sure you want to delete ${district.name}?`,
            accept: () => {
                this.districtState.deleteDistrict(district.id).subscribe({
                    next: () => {
                        this.alertService.success(
                            `District${district.name} deleted successfully`,
                        )
                    },
                    error: () => {
                        this.alertService.error('Delete failed')
                    },
                })
            },
        })
    }
}
