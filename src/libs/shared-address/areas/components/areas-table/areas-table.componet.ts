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
import { Area } from '../../areas.model'
import { AreaStateService } from '../../areas-state.service'
import { AreaModalComponent } from '../areas-modal/areas-modal.component'
@Component({
    selector: 'app-area-table',
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
    templateUrl: './areas-table.component.html',
    styleUrl: './areas-table.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [DialogService],
})
export class AreaTableComponent {
    district: Area[] = []
    isLoading = false

    private areaState = inject(AreaStateService)
    private cdr = inject(ChangeDetectorRef)
    private dialogService = inject(DialogService)
    private alertService = inject(AlertService)
    private confirmationService = inject(ConfirmationService)

    ngOnInit(): void {
        this.isLoading = true
        this.areaState.area$.subscribe({
            next: (data) => {
                this.district = data
                console.log(data)
                this.isLoading = false
                this.cdr.markForCheck()
            },
        })
        this.areaState.loadArea()
    }

    openModal(area?: Area) {
        this.dialogService.open(AreaModalComponent, {
            header: area ? 'Edit Area' : 'Add Area',
            data: { area },
            width: '50%',
            closable: true,
            baseZIndex: 10000,
        })
    }
    deleteArea(area: Area) {
        this.confirmationService.confirm({
            header: 'Delete Confirmation',
            message: `Are you sure you want to delete ${area.name}?`,
            accept: () => {
                this.areaState.deleteArea(area.id).subscribe({
                    next: () => {
                        this.alertService.success(
                            `Area${area.name} deleted successfully`,
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
