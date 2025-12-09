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
import { Country } from '../../country.model'
import { CountryStateService } from '../../country-state.service'
import { CountryModalComponent } from '../country-modal/country-modal.component'
@Component({
    selector: 'app-country-table',
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
    templateUrl: './country-table.component.html',
    styleUrl: './country-table.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [DialogService],
})
export class CountryTableComponent {
    country: Country[] = []
    isLoading = false

    private countryState = inject(CountryStateService)
    private cdr = inject(ChangeDetectorRef)
    private dialogService = inject(DialogService)
    private alertService = inject(AlertService)
    private confirmationService = inject(ConfirmationService)

    ngOnInit(): void {
        this.isLoading = true
        this.countryState.country$.subscribe({
            next: (data) => {
                this.country = data
                this.isLoading = false
                this.cdr.markForCheck()
            },
        })
        this.countryState.loadCountry()
    }

    // Open Add/Edit Modal
    openModal(country?: Country) {
        this.dialogService.open(CountryModalComponent, {
            header: country ? 'Edit Country' : 'Add Country',
            data: { country },
            width: '50%',
            closable: true,
            baseZIndex: 10000,
        })
    }

    deleteCountry(country: Country) {
        this.confirmationService.confirm({
            header: 'Delete Confirmation',
            message: `Are you sure you want to delete ${country.name}?`,
            accept: () => {
                this.countryState.deleteCountry(country.id).subscribe({
                    next: () => {
                        this.alertService.success(
                            `Country ${country.name} deleted successfully`,
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
