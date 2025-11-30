import { CommonModule } from '@angular/common'
import { Component, inject, OnInit } from '@angular/core'
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms'
import { Router, RouterModule } from '@angular/router'
import { MessageService } from 'primeng/api'
import { ToastModule } from 'primeng/toast'

@Component({
    selector: 'app-reset',
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule, RouterModule, ToastModule],
    providers: [MessageService],
    templateUrl: './page-reset.component.html',
})
export class PageResetComponent implements OnInit {
    fb = inject(FormBuilder)
    router = inject(Router)
    messageService = inject(MessageService)

    resetForm!: FormGroup
    showPassword = false
    showConfirmPassword = false

    ngOnInit() {
        this.resetForm = this.fb.group(
            {
                newPassword: [
                    '',
                    [Validators.required, Validators.minLength(8)],
                ],
                confirmPassword: ['', [Validators.required]],
                rememberMe: [false],
            },
            { validators: this.passwordMatchValidator },
        )
    }

    passwordMatchValidator(form: FormGroup) {
        const newPassword = form.get('newPassword')?.value
        const confirmPassword = form.get('confirmPassword')?.value
        if (newPassword !== confirmPassword) {
            form.get('confirmPassword')?.setErrors({ mismatch: true })
        } else {
            form.get('confirmPassword')?.setErrors(null)
        }
        return null
    }

    togglePassword() {
        this.showPassword = !this.showPassword
    }

    toggleConfirmPassword() {
        this.showConfirmPassword = !this.showConfirmPassword
    }

    onSubmit() {
        this.resetForm.markAllAsTouched()

        if (this.resetForm.invalid) {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Please fill all fields correctly',
                life: 2000,
            })
            return
        }

        this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Password changed successfully!',
            life: 1500,
        })

        setTimeout(() => this.router.navigate(['']), 1500)
    }

    get newPasswordControl() {
        return this.resetForm.get('newPassword')
    }

    get confirmPasswordControl() {
        return this.resetForm.get('confirmPassword')
    }
}
