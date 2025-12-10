import { Component, inject, signal } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { ButtonModule } from 'primeng/button'
import { DialogModule } from 'primeng/dialog'
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog'
import { FloatLabelModule } from 'primeng/floatlabel'
import { InputTextModule } from 'primeng/inputtext'
import { FormInputComponent } from '../../../../common-components/form/form-input/form-input.component'
import { AlertService } from '../../../../common-service/lib/alert.service'
import { Localitie } from '../../localities.model'
import { LocalitieFormService } from '../../localities-form.service'
import { LocalitieStateService } from '../../localities-state.service'
@Component({
    selector: 'app-localities-modal',
    imports: [
        ButtonModule,
        DialogModule,
        ReactiveFormsModule,
        FloatLabelModule,
        InputTextModule,
        FormInputComponent,
    ],
    templateUrl: './localities-modal.component.html',
    styleUrls: ['./localities-modal.component.css'],
    standalone: true,
})
export class LocalitieModalComponent {
    private config = inject(DynamicDialogConfig)
    private ref = inject(DynamicDialogRef)

    protected localitieFormService = inject(LocalitieFormService)
    private localitieState = inject(LocalitieStateService)
    private alertService = inject(AlertService)

    isLoading = signal(false)
    isError = signal(false)

    ngOnInit() {
        const selectedLocalitie: Localitie = this.config.data?.localitie

        if (selectedLocalitie) {
            this.localitieFormService.patchForm(selectedLocalitie)
        }
    }

    submit(event: Event) {
        event.preventDefault()
        this.isLoading.set(true)

        const selectedLocalitie = this.config.data?.localitie
        const formValue = this.localitieFormService.getValue()

        if (selectedLocalitie) {
            const localitieData: Partial<Localitie> = {
                ...formValue,
                id: selectedLocalitie.id,
            }
            this.updateLocalitie(localitieData)
        } else {
            this.addLocalitie(formValue)
        }
    }

    addLocalitie(localitieData: Partial<Localitie>) {
        this.localitieState.createLocalitie(localitieData).subscribe({
            next: (newLocalitie: Localitie) => {
                this.localitieFormService.form.reset()
                this.isLoading.set(false)
                this.alertService.success('Localitie added successfully')
                this.ref.close(newLocalitie)
            },
            error: () => {
                this.isLoading.set(false)
                this.alertService.error('Failed to add Localitie')
            },
        })
    }

    updateLocalitie(localitieData: Partial<Localitie>) {
        this.localitieState
            .updateLocalitie(localitieData.id!, localitieData)
            .subscribe({
                next: () => {
                    this.localitieFormService.form.reset()
                    this.isLoading.set(false)
                    this.alertService.success('Localities updated successfully')
                    this.ref.close(localitieData)
                },
                error: () => {
                    this.isLoading.set(false)
                    this.alertService.error('Failed to update Localities')
                },
            })
    }
}
