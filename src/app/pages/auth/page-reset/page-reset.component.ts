import { CommonModule } from '@angular/common'
import { Component, inject, OnInit } from '@angular/core'
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    ValidationErrors,
    Validators,
} from '@angular/forms'
import { Router, RouterModule } from '@angular/router'
import { MessageService } from 'primeng/api'
import { ButtonModule } from 'primeng/button'
import { PasswordModule } from 'primeng/password'
import { ToastModule } from 'primeng/toast'
import { passwordMatchValidator } from '../../../../libs/common-service/lib/password-match.validator'
import { ForgotPasswordStateService } from '../../../../libs/forgot-password/forgot-password-state.service'
import { OtpStateService } from '../../../../libs/otp/otp-state.service'

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
    templateUrl: './page-reset.component.html',
})
export class PageResetComponent implements OnInit {
    resetForm: FormGroup
    email = ''

    private forgotPasswordStateService = inject(ForgotPasswordStateService)
    private otpStateService = inject(OtpStateService)

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
            { validators: passwordMatchValidator() },
        )
    }

    // Use getter for loading state from service
    get loading(): boolean {
        return this.forgotPasswordStateService.isLoading()
    }

    ngOnInit() {
        this.checkOtpVerificationAndTransferEmail()
    }

    private checkOtpVerificationAndTransferEmail() {
        const otpState = this.otpStateService.getState()

        console.log('OTP State in reset component:', otpState)

        // Check if OTP is verified
        if (otpState.verificationStatus !== 'verified') {
            this.messageService.add({
                severity: 'warn',
                summary: 'Access Denied',
                detail: 'Please verify OTP first',
                life: 3000,
            })
            setTimeout(() => this.router.navigate(['/verified']), 3000)
            return
        }

        // Get the identifier (email) from OTP state
        this.email = otpState.identifier

        if (!this.email) {
            this.messageService.add({
                severity: 'error',
                summary: 'Session Expired',
                detail: 'Email not found. Please restart the password reset process.',
                life: 3000,
            })
            setTimeout(() => this.router.navigate(['/verified']), 3000) // Fixed: Navigate to /verified
            return
        }

        // Transfer email to ForgotPasswordStateService
        this.forgotPasswordStateService.setEmail(this.email)
        // Mark OTP as verified in the ForgotPasswordStateService
        this.markOtpAsVerified()
    }

    private markOtpAsVerified() {
        // Use the public method from ForgotPasswordStateService
        this.forgotPasswordStateService.markOtpAsVerified()
    }

    onSubmit() {
        this.resetForm.markAllAsTouched()

        if (this.resetForm.invalid) {
            this.showFormErrors()
            return
        }

        if (!this.email) {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Email not found. Please restart the process.',
                life: 3000,
            })
            return
        }

        // Use ForgotPasswordStateService to reset password
        this.forgotPasswordStateService
            .resetPassword(
                this.resetForm.value.password,
                this.resetForm.value.confirmPassword,
            )
            .subscribe({
                next: () => {
                    if (this.forgotPasswordStateService.isResetCompleted()) {
                        this.onResetSuccess()
                    } else {
                        const errorMessage =
                            this.forgotPasswordStateService.getErrorMessage() ||
                            'Password reset failed'
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Reset Failed',
                            detail: errorMessage,
                            life: 3000,
                        })
                    }
                },
                error: (error) => {
                    this.handleError(error)
                },
            })
    }

    private showFormErrors() {
        if (this.passwordControl?.hasError('required')) {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Password is required',
                life: 2000,
            })
        } else if (this.passwordControl?.hasError('minlength')) {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Password must be at least 8 characters',
                life: 2000,
            })
        } else if (this.resetForm.hasError('passwordMismatch')) {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Passwords do not match',
                life: 2000,
            })
        }
    }

    private onResetSuccess() {
        const successMessage =
            this.forgotPasswordStateService.getSuccessMessage() ||
            'Password has been successfully reset.'

        this.messageService.add({
            severity: 'success',
            summary: 'Password Reset Successful',
            detail: successMessage,
            life: 3000,
        })

        // Clear both services' state
        this.otpStateService.clearOtpState()
        this.forgotPasswordStateService.clearState()

        // Redirect to login
        setTimeout(() => {
            this.router.navigate(['/login'])
        }, 3000)
    }

    private handleError(error: any) {
        let errorMessage = 'Failed to reset password. Please try again.'

        if (error.status === 400) {
            errorMessage =
                error.error?.message ||
                'Invalid request. Please check your inputs.'
        } else if (error.status === 404) {
            errorMessage = 'User not found with this email.'
        } else if (error.status === 409) {
            errorMessage = 'Password cannot be same as previous password.'
        } else if (error.status === 500) {
            errorMessage = 'Server error. Please try again later.'
        }

        this.messageService.add({
            severity: 'error',
            summary: 'Reset Failed',
            detail: errorMessage,
            life: 3000,
        })
    }

    get passwordControl() {
        return this.resetForm.get('password')
    }

    get confirmPasswordControl() {
        return this.resetForm.get('confirmPassword')
    }

    goBackToOtp() {
        // Navigate back to OTP verification page
        this.router.navigate(['/verifiedotp'])
    }
}
