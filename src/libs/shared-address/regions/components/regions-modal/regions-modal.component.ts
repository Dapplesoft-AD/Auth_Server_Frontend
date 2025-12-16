import { CommonModule } from '@angular/common'
import { Component, inject, signal } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog'
import { AlertService } from '../../../../common-service/lib/alert.service'
import { PrimeModules } from '../../../../prime-modules'
import { Region, RegionDto } from '../../regions.model'
import { RegionFormService } from '../../regions-form.service'
import { RegionListStateService } from '../../regions-state.service'

@Component({
    selector: 'app-region-modal',
    standalone: true,
    imports: [CommonModule, PrimeModules, FormsModule, ReactiveFormsModule],
    templateUrl: './regions-modal.component.html',
    styleUrls: ['./regions-modal.component.css'],
})
export class RegionModalComponent {
    protected regionFormService = inject(RegionFormService)
    private regionState = inject(RegionListStateService)
    private alertService = inject(AlertService)
    private ref = inject(DynamicDialogRef)
    private config = inject(DynamicDialogConfig)

    isLoading = signal(false)
    isEditMode = signal(false)
    private regionId?: string

    constructor() {
        this.initializeForm()
    }

    private initializeForm() {
        const region: Region | undefined = this.config.data?.region

        if (region) {
            this.isEditMode.set(true)
            this.regionId = region.id
            this.regionFormService.patchForm(region)
        } else {
            this.isEditMode.set(false)
            this.regionId = undefined
            this.regionFormService.resetForm()
        }
    }

    submit(event: Event) {
        event.preventDefault()
        if (this.regionFormService.form.invalid) return

        this.isLoading.set(true)
        const regionData: RegionDto = this.regionFormService.getValue()

        this.isEditMode()
            ? this.updateRegion(regionData)
            : this.createRegion(regionData)
    }

    createRegion(region: RegionDto) {
        this.regionState.createRegion(region).subscribe({
            next: (res) => {
                this.isLoading.set(false)
                this.ref.close(res)
                this.alertService.success('Region created successfully')
            },
            error: () => {
                this.isLoading.set(false)
                this.alertService.error('Failed to create region')
            },
        })
    }

    updateRegion(region: RegionDto) {
        if (!this.regionId) return

        this.regionState.updateRegion(this.regionId, region).subscribe({
            next: (res) => {
                this.isLoading.set(false)
                this.ref.close(res)
                this.alertService.success('Region updated successfully')
            },
            error: () => {
                this.isLoading.set(false)
                this.alertService.error('Failed to update region')
            },
        })
    }
}
