import { Component, inject, signal } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { ButtonModule } from 'primeng/button'
import { DialogModule } from 'primeng/dialog'
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog'
import { FloatLabelModule } from 'primeng/floatlabel'
import { InputTextModule } from 'primeng/inputtext'
import { FormInputComponent } from '../../../../common-components/form/form-input/form-input.component'
import { AlertService } from '../../../../common-service/lib/alert.service'
import { Region } from '../../regions.model'
import { RegionFormService } from '../../regions-form.service'
import { RegionStateService } from '../../regions-state.service'
@Component({
    selector: 'app-region-modal',
    imports: [
        ButtonModule,
        DialogModule,
        ReactiveFormsModule,
        FloatLabelModule,
        InputTextModule,
        FormInputComponent,
    ],
    templateUrl: './regions-modal.component.html',
    styleUrls: ['./regions-modal.component.css'],
    standalone: true,
})
export class RegionModalComponent {
    private config = inject(DynamicDialogConfig)
    private ref = inject(DynamicDialogRef)

    protected regionFormService = inject(RegionFormService)
    private regionState = inject(RegionStateService)
    private alertService = inject(AlertService)

    isLoading = signal(false)
    isError = signal(false)

    ngOnInit() {
        const selectedRegion: Region = this.config.data?.region

        if (selectedRegion) {
            this.regionFormService.patchForm(selectedRegion)
        }
    }

    submit(event: Event) {
        event.preventDefault()
        this.isLoading.set(true)

        const selectedRegion = this.config.data?.region
        const formValue = this.regionFormService.getValue()

        if (selectedRegion) {
            const regionData: Partial<Region> = {
                ...formValue,
                id: selectedRegion.id,
            }
            this.updateRegion(regionData)
        } else {
            this.addRegion(formValue)
        }
    }

    addRegion(regionData: Partial<Region>) {
        this.regionState.createRegion(regionData).subscribe({
            next: (newRegion) => {
                this.regionFormService.form.reset()
                this.isLoading.set(false)
                this.alertService.success('Region added successfully')
                this.ref.close(newRegion)
            },
            error: () => {
                this.isLoading.set(false)
                this.alertService.error('Failed to add region')
            },
        })
    }

    updateRegion(regionData: Partial<Region>) {
        this.regionState.updateCountry(regionData.id!, regionData).subscribe({
            next: () => {
                this.regionFormService.form.reset()
                this.isLoading.set(false)
                this.alertService.success('Region updated successfully')
                this.ref.close(regionData)
            },
            error: () => {
                this.isLoading.set(false)
                this.alertService.error('Failed to update region')
            },
        })
    }
}
