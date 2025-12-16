import { CommonModule } from '@angular/common'
import { Component, inject, signal } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog'
import { AlertService } from '../../../common-service/lib/alert.service'
import { PrimeModules } from '../../../prime-modules'
import { Role, RoleDto } from '../../role.model'
import { RoleApiService } from '../../role-api.service'
import { RoleFormService } from '../../role-form.service'

@Component({
    selector: 'app-role-modal',
    imports: [CommonModule, PrimeModules, FormsModule, ReactiveFormsModule],
    templateUrl: './role-modal.component.html',
    styleUrl: './role-modal.component.css',
})
export class CreateRoleModalComponent {
    protected roleFormService = inject(RoleFormService)
    private roleApiService = inject(RoleApiService)
    private alertService = inject(AlertService)
    private ref = inject(DynamicDialogRef)
    private config = inject(DynamicDialogConfig)

    isLoading = signal(false)
    isEditMode = signal(false)
    private roleId?: string

    constructor() {
        this.initializeForm()
    }

    private initializeForm() {
        const role: Role | undefined = this.config.data?.role

        if (role) {
            this.isEditMode.set(true)
            this.roleId = role.id
            this.roleFormService.form.patchValue({
                roleName: role.roleName,
                description: role.description,
            })
        } else {
            this.isEditMode.set(false)
            this.roleId = undefined
            this.roleFormService.form.reset()
        }
    }

    submit(event: Event) {
        event.preventDefault()
        if (this.roleFormService.form.invalid) return

        this.isLoading.set(true)
        const formValue = this.roleFormService.getValue()

        const roleData: RoleDto = {
            roleName: formValue.roleName!,
            description: formValue.description!,
        }

        this.isEditMode()
            ? this.updateRole(roleData)
            : this.createRole(roleData)
    }

    createRole(role: RoleDto) {
        this.roleApiService.createRole(role).subscribe({
            next: (res) => {
                this.isLoading.set(false)
                this.ref.close(res)
                this.alertService.success('Role created successfully')
            },
            error: () => {
                this.isLoading.set(false)
                this.alertService.error('Failed to create role')
            },
        })
    }

    updateRole(role: RoleDto) {
        if (!this.roleId) return

        this.roleApiService.updateRole(this.roleId, role).subscribe({
            next: (res) => {
                this.isLoading.set(false)
                this.ref.close(res)
                this.alertService.success('Role updated successfully')
            },
            error: () => {
                this.isLoading.set(false)
                this.alertService.error('Failed to update role')
            },
        })
    }
}
