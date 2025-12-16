import { CommonModule } from '@angular/common'
import { Component, inject, signal } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog'
import { AlertService } from '../../../../common-service/lib/alert.service'
import { PrimeModules } from '../../../../prime-modules'
import { Country } from '../../country.model'
import { CountryApiService } from '../../country-api.service'
import { CountryFormService } from '../../country-form.service'

@Component({
    selector: 'app-country-modal',
    imports: [CommonModule, PrimeModules, FormsModule, ReactiveFormsModule],
    templateUrl: './country-modal.component.html',
    styleUrl: './country-modal.component.css',
})
export class CountryModalComponent {
    protected countryFormService = inject(CountryFormService)
    private countryApiService = inject(CountryApiService)
    private alertService = inject(AlertService)
    private ref = inject(DynamicDialogRef)
    private config = inject(DynamicDialogConfig)

    isLoading = signal(false)
    isEditMode = signal(false)
    private countryId?: string

    constructor() {
        this.initializeForm()
    }

    private initializeForm() {
        const country: Country | undefined = this.config.data?.country

        if (country) {
            this.isEditMode.set(true)
            this.countryId = country.id
            this.countryFormService.patchForm(country)
        } else {
            this.isEditMode.set(false)
            this.countryId = undefined
            this.countryFormService.resetForm()
        }
    }

    submit(event: Event) {
        event.preventDefault()
        if (this.countryFormService.form.invalid) return

        this.isLoading.set(true)
        const formValue = this.countryFormService.getValue()

        const countryData: Country = {
            id: this.countryId || '',
            name: formValue.name!,
            capital: formValue.capital!,
            phoneCode: formValue.phoneCode!,
            isActive: formValue.isActive!,
        }

        this.isEditMode()
            ? this.updateCountry(countryData)
            : this.createCountry(countryData)
    }

    createCountry(country: Country) {
        this.countryApiService.createCountry(country).subscribe({
            next: (res) => {
                this.isLoading.set(false)
                this.ref.close(res)
                this.alertService.success('Country created successfully')
            },
            error: () => {
                this.isLoading.set(false)
                this.alertService.error('Failed to create country')
            },
        })
    }

    updateCountry(country: Country) {
        if (!this.countryId) return

        this.countryApiService
            .updateCountry(this.countryId, country)
            .subscribe({
                next: (res) => {
                    this.isLoading.set(false)
                    this.ref.close(res)
                    this.alertService.success('Country updated successfully')
                },
                error: () => {
                    this.isLoading.set(false)
                    this.alertService.error('Failed to update country')
                },
            })
    }
}
