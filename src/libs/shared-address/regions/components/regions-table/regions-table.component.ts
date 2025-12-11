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
import { Region } from '../../regions.model'
import { RegionStateService } from '../../regions-state.service'
import { RegionModalComponent } from '../regions-modal/regions-modal.component'
@Component({
    selector: 'app-region-table',
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
    templateUrl: './regions-table.component.html',
    styleUrl: './regions-table.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [DialogService, ConfirmationService],
})
export class RegionTableComponent {
    region: Region[] = []
    isLoading = false

    private regionState = inject(RegionStateService)
    private cdr = inject(ChangeDetectorRef)
    private dialogService = inject(DialogService)
    private alertService = inject(AlertService)
    private confirmationService = inject(ConfirmationService)

    ngOnInit(): void {
        this.isLoading = true
        this.regionState.region$.subscribe({
            next: (data) => {
                this.region = data
                console.log(data)
                this.isLoading = false
                this.cdr.markForCheck()
            },
        })
        this.regionState.loadRegion()
    }

    // Open Add/Edit Modal
    openModal(region?: Region) {
        this.dialogService.open(RegionModalComponent, {
            header: region ? 'Edit Region' : 'Add Region',
            data: { region },
            width: '50%',
            closable: true,
            baseZIndex: 10000,
        })
    }

    deleteRegion(region: Region) {
        this.confirmationService.confirm({
            header: 'Delete Confirmation',
            message: `Are you sure you want to delete ${region.name}?`,
            accept: () => {
                this.regionState.deleteRegion(region.id).subscribe({
                    next: () => {
                        this.alertService.success(
                            `Region ${region.name} deleted successfully`,
                        )
                    },
                    error: (err) => {
                        console.error('Delete failed:', err)
                        this.alertService.error('Delete failed')
                    },
                })
            },
        })
    }
}
