import { Component, inject, signal } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { ButtonModule } from 'primeng/button'
import { DialogModule } from 'primeng/dialog'
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog'
import { FloatLabelModule } from 'primeng/floatlabel'
import { InputTextModule } from 'primeng/inputtext'
import { FormInputComponent } from '../../../common-components/form/form-input/form-input.component'
import { AlertService } from '../../../common-service/lib/alert.service'
import { Role } from '../../role.model'
import { RoleFormService } from '../../role-form.service'
import { RoleStateService } from '../../role-state.service'

@Component({
    selector: 'app-edit-role-modal',
    imports: [
        ButtonModule,
        DialogModule,
        ReactiveFormsModule,
        FloatLabelModule,
        InputTextModule,
        FormInputComponent,
    ],
    templateUrl: './edit-role-modal.component.html',
    styleUrls: ['./edit-role-modal.component.css'],
    standalone: true,
})
export class EditRoleModalComponent {
    private config = inject(DynamicDialogConfig)
    private ref = inject(DynamicDialogRef)

    protected roleFormService = inject(RoleFormService)
    private roleState = inject(RoleStateService)
    private alertService = inject(AlertService)

    isLoading = signal(false)
    isError = signal(false)

    ngOnInit() {
        const selectedRole: Role = this.config.data?.role

        if (selectedRole) {
            this.roleFormService.patchForm(selectedRole)
        }
    }

    submit(event: Event) {
        event.preventDefault()
        this.isLoading.set(true)

        const selectedRole = this.config.data?.role
        const formValue = this.roleFormService.getValue()

        const roleData: Partial<Role> = {
            ...formValue,
            id: selectedRole.id,
        }

        this.updateRole(roleData)
    }
    updateRole(roleData: Partial<Role>) {
        this.roleState.updateRole(roleData.id!, roleData).subscribe({
            next: () => {
                this.roleFormService.form.reset()
                this.isLoading.set(false)
                this.alertService.success('Role updated successfully')
                this.ref.close(roleData)
            },
            error: () => {
                this.isLoading.set(false)
                this.isError.set(true)
                this.alertService.error('Failed to update role')
                this.ref.close()
            },
        })
    }
}
