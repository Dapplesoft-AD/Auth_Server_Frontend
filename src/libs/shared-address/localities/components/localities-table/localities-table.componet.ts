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
import { Localitie } from '../../localities.model'
import { LocalitieStateService } from '../../localities-state.service'
import { LocalitieModalComponent } from '../localities-modal/localities-modal.component'
@Component({
    selector: 'app-localities-table',
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
    templateUrl: './localities-table.component.html',
    styleUrl: './localities-table.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [DialogService],
})
export class LocalitieTableComponent {
    localitie: Localitie[] = []
    isLoading = false

    private localitieState = inject(LocalitieStateService)
    private cdr = inject(ChangeDetectorRef)
    private dialogService = inject(DialogService)
    private alertService = inject(AlertService)
    private confirmationService = inject(ConfirmationService)

    ngOnInit(): void {
        this.isLoading = true
        this.localitieState.area$.subscribe({
            next: (data) => {
                this.localitie = data
                console.log(data)
                this.isLoading = false
                this.cdr.markForCheck()
            },
        })
        this.localitieState.loadLocalitie()
    }

    openModal(localitie?: Localitie) {
        this.dialogService.open(LocalitieModalComponent, {
            header: localitie ? 'Edit Area' : 'Add Area',
            data: { localitie },
            width: '50%',
            closable: true,
            baseZIndex: 10000,
        })
    }
    deleteLocalitie(localitie: Localitie) {
        this.confirmationService.confirm({
            header: 'Delete Confirmation',
            message: `Are you sure you want to delete ${localitie.name}?`,
            accept: () => {
                this.localitieState.deleteLocalitie(localitie.id).subscribe({
                    next: () => {
                        this.alertService.success(
                            `Area${localitie.name} deleted successfully`,
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
