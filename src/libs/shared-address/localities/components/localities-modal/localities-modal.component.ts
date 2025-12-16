import { CommonModule } from '@angular/common'
import { Component, inject, signal } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog'
import { AlertService } from '../../../../common-service/lib/alert.service'
import { PrimeModules } from '../../../../prime-modules'
import { Localitie } from '../../localities.model'
import { LocalitieFormService } from '../../localities-form.service'
import { LocalitieListStateService } from '../../localities-state.service'

@Component({
    selector: 'app-localities-modal',
    imports: [CommonModule, PrimeModules, FormsModule, ReactiveFormsModule],
    templateUrl: './localities-modal.component.html',
    styleUrls: ['./localities-modal.component.css'],
})
export class LocalitieModalComponent {
    protected localitieFormService = inject(LocalitieFormService)
    private localitieState = inject(LocalitieListStateService)
    private alertService = inject(AlertService)
    private ref = inject(DynamicDialogRef)
    private config = inject(DynamicDialogConfig)

    isLoading = signal(false)
    isEditMode = signal(false)
    private localitieId?: string

    constructor() {
        this.initializeForm()
    }

    private initializeForm() {
        const localitie: Localitie | undefined = this.config.data?.localitie

        if (localitie) {
            this.isEditMode.set(true)
            this.localitieId = localitie.id
            this.localitieFormService.patchForm(localitie)
        } else {
            this.isEditMode.set(false)
            this.localitieId = undefined
            this.localitieFormService.form.reset()
        }
    }

    submit(event: Event) {
        event.preventDefault()
        if (this.localitieFormService.form.invalid) return

        this.isLoading.set(true)
        const formValue = this.localitieFormService.getValue()

        const localitieData: Localitie = {
            id: this.localitieId || '',
            countryId: formValue.countryId!,
            areaId: formValue.areaId!,
            name: formValue.name!,
            type: formValue.type!,
            typeName: formValue.typeName!,
            isActive: formValue.isActive ?? true,
        }

        this.isEditMode()
            ? this.updateLocalitie(localitieData)
            : this.createLocalitie(localitieData)
    }

    private createLocalitie(localitie: Localitie) {
        this.localitieState.createLocalitie(localitie).subscribe({
            next: (newLocalitie) => {
                this.isLoading.set(false)
                this.ref.close(newLocalitie)
                this.alertService.success('Localitie created successfully')
            },
            error: () => {
                this.isLoading.set(false)
                this.alertService.error('Failed to create Localitie')
            },
        })
    }

    private updateLocalitie(localitie: Localitie) {
        if (!this.localitieId) return

        this.localitieState
            .updateLocalitie(this.localitieId, localitie)
            .subscribe({
                next: (updatedLocalitie) => {
                    this.isLoading.set(false)
                    this.ref.close(updatedLocalitie)
                    this.alertService.success('Localitie updated successfully')
                },
                error: () => {
                    this.isLoading.set(false)
                    this.alertService.error('Failed to update Localitie')
                },
            })
    }
}
