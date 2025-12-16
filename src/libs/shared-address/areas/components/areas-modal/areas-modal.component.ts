import { CommonModule } from '@angular/common'
import { Component, inject, signal } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog'
import { AlertService } from '../../../../common-service/lib/alert.service'
import { PrimeModules } from '../../../../prime-modules'
import { Area, AreaDto } from '../../areas.model'
import { AreaApiService } from '../../areas-api.service'
import { AreaFormService } from '../../areas-form.service'

@Component({
    selector: 'app-areas-modal',
    imports: [CommonModule, PrimeModules, FormsModule, ReactiveFormsModule],
    templateUrl: './areas-modal.component.html',
    styleUrls: ['./areas-modal.component.css'],
})
export class AreaModalComponent {
    protected areaFormService = inject(AreaFormService)
    private areaApiService = inject(AreaApiService)
    private alertService = inject(AlertService)
    private ref = inject(DynamicDialogRef)
    private config = inject(DynamicDialogConfig)

    isLoading = signal(false)
    isEditMode = signal(false)
    private areaId?: string

    constructor() {
        this.initializeForm()
    }

    private initializeForm() {
        const area: Area | undefined = this.config.data?.area

        if (area) {
            this.isEditMode.set(true)
            this.areaId = area.id
            this.areaFormService.patchForm(area)
        } else {
            this.isEditMode.set(false)
            this.areaId = undefined
            this.areaFormService.resetForm()
        }
    }

    submit(event: Event) {
        event.preventDefault()
        if (this.areaFormService.form.invalid) return

        this.isLoading.set(true)
        const formValue = this.areaFormService.getValue()

        const area: Area = {
            id: this.isEditMode() ? this.areaId! : '',
            countryId: formValue.countryId!,
            districtId: formValue.districtId!,
            name: formValue.name!,
            typeName: formValue.typeName!,
            type: formValue.type!,
            isActive: formValue.isActive ?? true,
        }

        if (this.isEditMode()) {
            this.updateArea(area)
        } else {
            this.createArea(area)
        }
    }

    private createArea(area: Area) {
        this.areaApiService.createArea(area).subscribe({
            next: (newArea: Area) => {
                this.isLoading.set(false)
                this.ref.close(newArea)
                this.alertService.success('Area created successfully')
            },
            error: () => {
                this.isLoading.set(false)
                this.alertService.error('Failed to create area')
            },
        })
    }

    private updateArea(area: Area) {
        this.areaApiService.updateArea(area.id, area).subscribe({
            next: (updatedArea: Area) => {
                this.isLoading.set(false)
                this.ref.close(updatedArea)
                this.alertService.success('Area updated successfully')
            },
            error: () => {
                this.isLoading.set(false)
                this.alertService.error('Failed to update area')
            },
        })
    }
}
