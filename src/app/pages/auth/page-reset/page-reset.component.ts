import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'

import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms'
import { Router, RouterModule } from '@angular/router'
import { MessageService } from 'primeng/api'
import { ButtonModule } from 'primeng/button'
import { PasswordModule } from 'primeng/password'
import { ToastModule } from 'primeng/toast'

@Component({
    selector: 'app-reset',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule,
        ToastModule,
        PasswordModule,
        ButtonModule,
    ],
    providers: [MessageService],
    templateUrl: './page-reset.component.html',
})
export class PageResetComponent {
    resetForm: FormGroup

    constructor(
        private fb: FormBuilder,
        private messageService: MessageService,
        private router: Router,
    ) {
        this.resetForm = this.fb.group(
            {
                password: ['', [Validators.required, Validators.minLength(8)]],
                confirmPassword: ['', Validators.required],
            },
            { validators: this.passwordMatchValidator },
        )
    }

    passwordMatchValidator(group: FormGroup) {
        const pass = group.get('password')?.value
        const confirm = group.get('confirmPassword')?.value
        return pass === confirm ? null : { mismatch: true }
    }

    onSubmit() {
        this.resetForm.markAllAsTouched()

        if (this.resetForm.valid) {
            this.messageService.add({
                severity: 'success',
                summary: 'Password Reset',
                detail: 'Password changed successfully! Redirecting to login...',
                life: 2000,
            })

            setTimeout(() => this.router.navigate(['/']), 2000)
        } else {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Please fix the errors in the form',
                life: 2000,
            })
        }
    }

    get passwordControl() {
        return this.resetForm.get('password')
    }

    get confirmPasswordControl() {
        return this.resetForm.get('confirmPassword')
    }
}
