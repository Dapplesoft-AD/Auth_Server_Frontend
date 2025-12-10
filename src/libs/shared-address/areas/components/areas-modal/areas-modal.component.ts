import { Component, inject, signal } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { ButtonModule } from 'primeng/button'
import { DialogModule } from 'primeng/dialog'
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog'
import { FloatLabelModule } from 'primeng/floatlabel'
import { InputTextModule } from 'primeng/inputtext'
import { FormInputComponent } from '../../../../common-components/form/form-input/form-input.component'
import { AlertService } from '../../../../common-service/lib/alert.service'
import { Area } from '../../areas.model'
import { AreaFormService } from '../../areas-form.service'
import { AreaStateService } from '../../areas-state.service'
@Component({
    selector: 'app-areas-modal',
    imports: [
        ButtonModule,
        DialogModule,
        ReactiveFormsModule,
        FloatLabelModule,
        InputTextModule,
        FormInputComponent,
    ],
    templateUrl: './areas-modal.component.html',
    styleUrls: ['./areas-modal.component.css'],
    standalone: true,
})
export class AreaModalComponent {
    private config = inject(DynamicDialogConfig)
    private ref = inject(DynamicDialogRef)

    protected areaFormService = inject(AreaFormService)
    private areaState = inject(AreaStateService)
    private alertService = inject(AlertService)

    isLoading = signal(false)
    isError = signal(false)

    ngOnInit() {
        const selectedArea: Area = this.config.data?.area

        if (selectedArea) {
            this.areaFormService.patchForm(selectedArea)
        }
    }

    submit(event: Event) {
        event.preventDefault()
        this.isLoading.set(true)

        const selectedArea = this.config.data?.area
        const formValue = this.areaFormService.getValue()

        if (selectedArea) {
            const areaData: Partial<Area> = {
                ...formValue,
                id: selectedArea.id,
            }
            this.updateArea(areaData)
        } else {
            this.addArea(formValue)
        }
    }

    addArea(areaData: Partial<Area>) {
        this.areaState.createArea(areaData).subscribe({
            next: (newArea) => {
                this.areaFormService.form.reset()
                this.isLoading.set(false)
                this.alertService.success('Area added successfully')
                this.ref.close(newArea)
            },
            error: () => {
                this.isLoading.set(false)
                this.alertService.error('Failed to add area')
            },
        })
    }

    updateArea(areaData: Partial<Area>) {
        this.areaState.updateArea(areaData.id!, areaData).subscribe({
            next: () => {
                this.areaFormService.form.reset()
                this.isLoading.set(false)
                this.alertService.success('Area updated successfully')
                this.ref.close(areaData)
            },
            error: () => {
                this.isLoading.set(false)
                this.alertService.error('Failed to update Area')
            },
        })
    }
}
