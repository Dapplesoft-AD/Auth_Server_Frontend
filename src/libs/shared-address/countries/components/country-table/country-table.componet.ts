import { CommonModule } from '@angular/common'
import { Component, inject } from '@angular/core'
import { DialogService } from 'primeng/dynamicdialog'
import { AlertService } from '../../../../common-service/lib/alert.service'
import { PrimeModules } from '../../../../prime-modules'
import { Country } from '../../country.model'
import { CountryListStateService } from '../../country-state.service'
import { CountryModalComponent } from '../country-modal/country-modal.component'

@Component({
    selector: 'app-country-table',
    imports: [CommonModule, PrimeModules],
    templateUrl: './country-table.component.html',
    styleUrl: './country-table.component.css',
})
export class CountryTableComponent {
    protected countryListStateService = inject(CountryListStateService)
    private dialogService = inject(DialogService)
    private alertService = inject(AlertService)

    addCountry() {
        const ref = this.dialogService.open(CountryModalComponent, {
            header: 'Add Country',
            width: '50%',
            closable: true,
        })

        ref?.onClose.subscribe((country) => {
            if (country) {
                this.countryListStateService.init()
            }
        })
    }

    editCountry(country: Country) {
        const ref = this.dialogService.open(CountryModalComponent, {
            header: 'Edit Country',
            width: '50%',
            closable: true,
            data: { country },
        })

        ref?.onClose.subscribe((updatedCountry) => {
            if (updatedCountry) {
                this.countryListStateService.init()
            }
        })
    }

    confirmDelete(country: Country) {
        this.countryListStateService.deleteCountry(country.id).subscribe({
            next: () => {
                this.alertService.success('Country deleted successfully')
            },
            error: () => {
                this.alertService.error('Failed to delete country')
            },
        })
    }
}
