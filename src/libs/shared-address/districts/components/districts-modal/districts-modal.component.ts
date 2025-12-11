import { Component, inject, signal } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { ButtonModule } from 'primeng/button'
import { DialogModule } from 'primeng/dialog'
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog'
import { FloatLabelModule } from 'primeng/floatlabel'
import { InputTextModule } from 'primeng/inputtext'
import { FormInputComponent } from '../../../../common-components/form/form-input/form-input.component'
import { AlertService } from '../../../../common-service/lib/alert.service'
import { District } from '../../districts.model'
import { DistrictFormService } from '../../districts-form.service'
import { DistrictStateService } from '../../districts-state.service'
@Component({
    selector: 'app-distirct-modal',
    imports: [
        ButtonModule,
        DialogModule,
        ReactiveFormsModule,
        FloatLabelModule,
        InputTextModule,
        FormInputComponent,
    ],
    templateUrl: './districts-modal.component.html',
    styleUrls: ['./districts-modal.component.css'],
    standalone: true,
})
export class DistrictModalComponent {
    private config = inject(DynamicDialogConfig)
    private ref = inject(DynamicDialogRef)

    protected districtFormService = inject(DistrictFormService)
    private districtState = inject(DistrictStateService)
    private alertService = inject(AlertService)

    isLoading = signal(false)
    isError = signal(false)

    ngOnInit() {
        const selectedDistrict: District = this.config.data?.district

        if (selectedDistrict) {
            this.districtFormService.patchForm(selectedDistrict)
        }
    }

    submit(event: Event) {
        event.preventDefault()
        this.isLoading.set(true)

        const selectedDistrict = this.config.data?.district
        const formValue = this.districtFormService.getValue()

        if (selectedDistrict) {
            const districtData: Partial<District> = {
                ...formValue,
                id: selectedDistrict.id,
            }
            this.updateDistrict(districtData)
        } else {
            this.addDistrict(formValue)
        }
    }

    addDistrict(districtData: Partial<District>) {
        this.districtState.createDistrict(districtData).subscribe({
            next: (newRegion) => {
                this.districtFormService.form.reset()
                this.isLoading.set(false)
                this.alertService.success('District added successfully')
                this.ref.close(newRegion)
            },
            error: () => {
                this.isLoading.set(false)
                this.alertService.error('Failed to add District')
            },
        })
    }

    updateDistrict(districtData: Partial<District>) {
        this.districtState
            .updateDistrict(districtData.id!, districtData)
            .subscribe({
                next: () => {
                    this.districtFormService.form.reset()
                    this.isLoading.set(false)
                    this.alertService.success('District updated successfully')
                    this.ref.close(districtData)
                },
                error: () => {
                    this.isLoading.set(false)
                    this.alertService.error('Failed to update District')
                },
            })
    }
}
