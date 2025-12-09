import { Component, inject, signal } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { ButtonModule } from 'primeng/button'
import { DialogModule } from 'primeng/dialog'
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog'
import { FloatLabelModule } from 'primeng/floatlabel'
import { InputTextModule } from 'primeng/inputtext'
import { FormInputComponent } from '../../../../common-components/form/form-input/form-input.component'
import { AlertService } from '../../../../common-service/lib/alert.service'
import { Country } from '../../country.model'
import { CountryFormService } from '../../country-form.service'
import { CountryStateService } from '../../country-state.service'
@Component({
    selector: 'app-country-modal',
    imports: [
        ButtonModule,
        DialogModule,
        ReactiveFormsModule,
        FloatLabelModule,
        InputTextModule,
        FormInputComponent,
    ],
    templateUrl: './country-modal.component.html',
    styleUrls: ['./country-modal.component.css'],
    standalone: true,
})
export class CountryModalComponent {
    private config = inject(DynamicDialogConfig)
    private ref = inject(DynamicDialogRef)

    protected countryFormService = inject(CountryFormService)
    private countryState = inject(CountryStateService)
    private alertService = inject(AlertService)

    isLoading = signal(false)
    isError = signal(false)

    ngOnInit() {
        const selectedCountry: Country = this.config.data?.country

        if (selectedCountry) {
            this.countryFormService.patchForm(selectedCountry)
        }
    }

    submit(event: Event) {
        event.preventDefault()
        this.isLoading.set(true)

        const selectedCountry = this.config.data?.country
        const formValue = this.countryFormService.getValue()

        if (selectedCountry) {
            const countryData: Partial<Country> = {
                ...formValue,
                id: selectedCountry.id,
            }
            this.updateCountry(countryData)
        } else {
            this.addCountry(formValue)
        }
    }

    addCountry(countryData: Partial<Country>) {
        this.countryState.createCountry(countryData).subscribe({
            next: (newCountry) => {
                this.countryFormService.form.reset()
                this.isLoading.set(false)
                this.alertService.success('Country added successfully')
                this.ref.close(newCountry)
            },
            error: () => {
                this.isLoading.set(false)
                this.alertService.error('Failed to add country')
            },
        })
    }

    updateCountry(countryData: Partial<Country>) {
        this.countryState
            .updateCountry(countryData.id!, countryData)
            .subscribe({
                next: () => {
                    this.countryFormService.form.reset()
                    this.isLoading.set(false)
                    this.alertService.success('Country updated successfully')
                    this.ref.close(countryData)
                },
                error: () => {
                    this.isLoading.set(false)
                    this.alertService.error('Failed to update country')
                },
            })
    }
}
