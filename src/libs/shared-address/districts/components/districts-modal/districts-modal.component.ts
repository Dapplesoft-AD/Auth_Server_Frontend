import { CommonModule } from '@angular/common'
import { Component, inject, signal } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog'
import { AlertService } from '../../../../common-service/lib/alert.service'
import { PrimeModules } from '../../../../prime-modules'
import { District } from '../../districts.model'
import { DistrictFormService } from '../../districts-form.service'
import { DistrictListStateService } from '../../districts-state.service'

@Component({
    selector: 'app-district-modal',
    imports: [CommonModule, PrimeModules, FormsModule, ReactiveFormsModule],
    templateUrl: './districts-modal.component.html',
    styleUrls: ['./districts-modal.component.css'],
})
export class DistrictModalComponent {
    protected districtFormService = inject(DistrictFormService)
    private districtState = inject(DistrictListStateService)
    private alertService = inject(AlertService)
    private ref = inject(DynamicDialogRef)
    private config = inject(DynamicDialogConfig)

    isLoading = signal(false)
    isEditMode = signal(false)
    private districtId?: string

    constructor() {
        this.initializeForm()
    }

    private initializeForm() {
        const district: District | undefined = this.config.data?.district

        if (district) {
            this.isEditMode.set(true)
            this.districtId = district.id
            this.districtFormService.patchForm(district)
        } else {
            this.isEditMode.set(false)
            this.districtId = undefined
            this.districtFormService.resetForm()
        }
    }

    submit(event: Event) {
        event.preventDefault()
        if (this.districtFormService.form.invalid) return

        this.isLoading.set(true)
        const formValue = this.districtFormService.getValue()

        const districtData: District = {
            id: this.districtId || '',
            countryId: formValue.countryId!,
            regionId: formValue.regionId!,
            name: formValue.name!,
            isActive: formValue.isActive ?? true,
        }

        this.isEditMode()
            ? this.updateDistrict(districtData)
            : this.createDistrict(districtData)
    }

    private createDistrict(district: District) {
        this.districtState.createDistrict(district).subscribe({
            next: (res) => {
                this.isLoading.set(false)
                this.ref.close(res)
                this.alertService.success('District added successfully')
            },
            error: () => {
                this.isLoading.set(false)
                this.alertService.error('Failed to add district')
            },
        })
    }

    private updateDistrict(district: District) {
        if (!this.districtId) return
        this.districtState.updateDistrict(this.districtId, district).subscribe({
            next: (res) => {
                this.isLoading.set(false)
                this.ref.close(res)
                this.alertService.success('District updated successfully')
            },
            error: () => {
                this.isLoading.set(false)
                this.alertService.error('Failed to update district')
            },
        })
    }
}
