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
import { ToastModule } from 'primeng/toast'

@Component({
    selector: 'app-signup',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule,
        ToastModule,
        ButtonModule,
    ],
    providers: [MessageService],
    templateUrl: './page-signup.component.html',
})
export class PageSignupComponent {
    signupForm: FormGroup
    showPassword = false
    showConfirmPassword = false

    constructor(
        private fb: FormBuilder,
        private messageService: MessageService,
        private router: Router,
    ) {
        this.signupForm = this.fb.group(
            {
                fullName: ['', Validators.required],
                number: [
                    '',
                    [Validators.required, Validators.pattern(/^\d{11}$/)],
                ],
                password: ['', Validators.required],
                confirmPassword: ['', Validators.required],
                acceptTerms: [false, Validators.requiredTrue],
            },
            { validators: this.passwordMatchValidator },
        )
    }

    togglePassword() {
        this.showPassword = !this.showPassword
    }

    toggleConfirmPassword() {
        this.showConfirmPassword = !this.showConfirmPassword
    }

    passwordMatchValidator(group: FormGroup) {
        const password = group.get('password')?.value
        const confirm = group.get('confirmPassword')?.value
        return password === confirm ? null : { mismatch: true }
    }

    onSubmit() {
        if (this.signupForm.valid) {
            this.messageService.add({
                severity: 'success',
                summary: 'Sign Up Successful',
                detail: 'Welcome!',
                life: 2000,
            })
            setTimeout(() => this.router.navigate(['/verifiedotp']), 2000)
        } else {
            this.signupForm.markAllAsTouched()
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Please fix the errors in the form',
                life: 2500,
            })
        }
    }
}
