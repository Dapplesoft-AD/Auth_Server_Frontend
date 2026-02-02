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
import { OtpType } from '../../../../libs/otp/otpType.enum'

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
    templateUrl: './page-verified.component.html',
    providers: [MessageService],
})
export class PageVerifiedComponent implements OnInit {
    form!: FormGroup
    submitted = false
    loading = false
    baseUrl = `${environment.BaseUrl}`

    private otpStateService = inject(OtpStateService)

    constructor(
        private fb: FormBuilder,
        private messageService: MessageService,
        private router: Router,
    ) {}

    ngOnInit(): void {
        console.log('[OTP] PageVerifiedComponent init')

        this.form = this.fb.group({
            identifier: ['', [Validators.required, this.emailOrPhoneValidator]],
        })

        this.resetOtpFlow()
    }

    // ---------- VALIDATOR ----------
    emailOrPhoneValidator(control: AbstractControl) {
        const value = control.value
        if (!value) return null

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        const phoneRegex = /^[0-9]{11}$/

        return emailRegex.test(value) || phoneRegex.test(value)
            ? null
            : { invalidFormat: true }
    }

    get f() {
        return this.form.controls
    }

    // ---------- RESET ----------
    private resetOtpFlow(): void {
        console.log('[OTP] Resetting OTP state + form')

        this.submitted = false
        this.loading = false
        this.form?.reset()

        this.otpStateService.clearOtpState()
    }

    // ---------- SUBMIT ----------
    onSubmit(): void {
        this.submitted = true

        console.log('[OTP] Submit clicked')
        console.log('[OTP] Form value:', this.form.value)

        if (this.form.invalid) {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Enter a valid email or phone number.',
            })
            return
        }

        const identifier = this.form.value.identifier as string

        this.loading = true

        // 🔑 EXPLICIT OTP TYPE
        this.otpStateService.setOtpType(OtpType.PasswordReset)
        this.otpStateService.setIdentifier(identifier)

        console.log(
            '[OTP] Sending OTP with state:',
            this.otpStateService.getState(),
        )

        this.otpStateService.sendOtp().subscribe({
            next: () => {
                this.loading = false

                const { method, otpType } = this.otpStateService.getState()

                console.log('[OTP] OTP sent successfully')
                console.log('[OTP] Method:', method, 'Type:', otpType)

                this.messageService.add({
                    severity: 'success',
                    summary: 'OTP Sent',
                    detail: `OTP sent to your ${method}`,
                })

                setTimeout(() => {
                    this.router.navigate(['/verifiedotp'])
                }, 1200)
            },

            error: (err) => {
                this.loading = false

                console.error('[OTP] Send OTP failed', err)

                const { errorMessage } = this.otpStateService.getState()

                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: errorMessage ?? 'Failed to send OTP',
                })

                // ✅ allow retry
                this.submitted = false
            },
        })
    }
}
