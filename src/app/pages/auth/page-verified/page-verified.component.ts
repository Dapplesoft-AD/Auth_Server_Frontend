import { CommonModule } from '@angular/common'
import { Component, inject, OnInit } from '@angular/core'
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms'
import { Router } from '@angular/router'
import { MessageService } from 'primeng/api'
import { ButtonModule } from 'primeng/button'
import { FloatLabelModule } from 'primeng/floatlabel'
import { InputText } from 'primeng/inputtext'
import { ToastModule } from 'primeng/toast'
import { environment } from '../../../../environments/environment'
import { OtpStateService } from '../../../../libs/otp/otp-state.service'

@Component({
    selector: 'app-verified',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ButtonModule,
        ToastModule,
        InputText,
        FloatLabelModule,
    ],
    templateUrl: './page-verified.component.html', //  Correct template
    providers: [MessageService],
})
export class PageVerifiedComponent implements OnInit {
    form: FormGroup
    submitted = false
    loading = false
    baseUrl = `${environment.BaseUrl}`

    private otpStateService = inject(OtpStateService)

    constructor(
        private fb: FormBuilder,
        private messageService: MessageService,
        private router: Router,
    ) {
        this.form = this.fb.group({
            identifier: ['', [Validators.required, this.emailOrPhoneValidator]],
        })
    }

    ngOnInit() {
        // Optional: Clear previous state when component initializes
        this.otpStateService.clearOtpState()
    }

    emailOrPhoneValidator(control: AbstractControl) {
        const value = control.value
        if (!value) return null

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        const phoneRegex = /^[0-9]{11}$/

        if (emailRegex.test(value) || phoneRegex.test(value)) {
            return null
        }

        return { invalidFormat: true }
    }

    //  This getter must exist for the template
    get f() {
        return this.form.controls
    }

    onSubmit() {
        this.submitted = true

        if (this.form.invalid) {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Enter a valid email or phone number.',
            })
            return
        }

        const identifier = this.form.value.identifier
        this.loading = true

        // Store identifier in state service
        this.otpStateService.setIdentifier(identifier)

        // Call Send OTP API through state service
        this.otpStateService.sendOtp().subscribe({
            next: () => {
                this.loading = false
                const state = this.otpStateService.getState()
                const method = state.method

                this.messageService.add({
                    severity: 'success',
                    summary: 'OTP Sent',
                    detail: `OTP sent to your ${method}`,
                })

                setTimeout(() => {
                    this.router.navigate(['/verifiedotp'])
                }, 1500)
            },
            error: (error) => {
                this.loading = false
                const state = this.otpStateService.getState()
                const errorMessage =
                    state.errorMessage ||
                    'Failed to send OTP. Please try again.'
                console.error('Error sending OTP:', error)
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: errorMessage,
                })
            },
        })
    }
}
