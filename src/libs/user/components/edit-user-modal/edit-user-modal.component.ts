import { Component, inject, signal } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { ButtonModule } from 'primeng/button'
import { DialogModule } from 'primeng/dialog'
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog'
import { FloatLabelModule } from 'primeng/floatlabel'
import { InputTextModule } from 'primeng/inputtext'
import { FormInputComponent } from '../../../common-components/form/form-input/form-input.component'
import { AlertService } from '../../../common-service/lib/alert.service'
import { UserFormService } from '../../user.form.service'
import { User } from '../../user.model'
import { UserStateService } from '../../user-state.service'

@Component({
    selector: 'app-edit-user-modal',
    imports: [
        ButtonModule,
        DialogModule,
        ReactiveFormsModule,
        FloatLabelModule,
        InputTextModule,
        FormInputComponent,
    ],
    templateUrl: './edit-user-modal.component.html',
    styleUrl: './edit-user-modal.component.css',
})
export class EditUserModalComponent {
    public userFormService = inject(UserFormService)
    private userState = inject(UserStateService)
    private alertService = inject(AlertService)
    private ref = inject(DynamicDialogRef)
    private config = inject(DynamicDialogConfig)

    isLoading = signal<boolean>(false)
    isError = signal<boolean>(false)

    ngOnInit() {
        const selectedUser: User = this.config.data?.user
        if (selectedUser) {
            this.userFormService.patchForm(selectedUser)
        }
    }

    submit(event: Event) {
        this.isLoading.set(true)
        event.preventDefault()
        const selectedUser = this.config.data?.user
        const formValue = this.userFormService.getValue()

        const userData: Partial<User> = {
            ...formValue,
            id: selectedUser.id,
        }

        this.updateUser(userData)
    }

    updateUser(userData: Partial<User>) {
        this.userState.updateUser(userData.id!, userData).subscribe({
            next: (res) => {
                this.userFormService.form.reset()
                this.isLoading.set(false)
                this.alertService.success('User updated successfully')
                this.ref.close(userData)
            },
            error: () => {
                this.isLoading.set(false)
                this.isError.set(true)
                this.alertService.error('Failed to update user')
                this.ref.close()
            },
        })
    }
}
