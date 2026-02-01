import { CommonModule } from '@angular/common'
import { Component, inject } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { Router, RouterModule } from '@angular/router'
import { MessageService } from 'primeng/api'
import { ButtonModule } from 'primeng/button'
import { FloatLabelModule } from 'primeng/floatlabel'
import { InputTextModule } from 'primeng/inputtext'
import { PasswordModule } from 'primeng/password'
import { ProgressSpinner } from 'primeng/progressspinner'
import { ToastModule } from 'primeng/toast'
import { environment } from '../../../../environments/environment'
import { SignupApiService } from '../../../../libs/auth/signup/signup-api.service'
import { SignUpFormService } from '../../../../libs/auth/signup/signup-form.service'
import { FormInputComponent } from '../../../../libs/common-components/form/form-input/form-input.component'
import { OtpStateService } from '../../../../libs/otp/otp-state.service'
import { OtpType } from '../../../../libs/otp/otpType.enum'

@Component({
    selector: 'app-signup',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule,
        ToastModule,
        InputTextModule,
        PasswordModule,
        ButtonModule,
        FloatLabelModule,
        ProgressSpinner,
        FormInputComponent,
    ],
    providers: [MessageService, SignUpFormService],
    templateUrl: './page-signup.component.html',
})
export class PageSignupComponent {
    loading = false
    baseUrl = `${environment.BaseUrl}`

    private router = inject(Router)
    private signupApi = inject(SignupApiService)
    private otpState = inject(OtpStateService)
    private toast = inject(MessageService)

    constructor(public signUpFormService: SignUpFormService) {}

    private isEmail(v: string): boolean {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
    }

    private normalizePhone(v: string): string {
        const digits = v.replace(/\D/g, '')
        return digits.startsWith('88') ? digits.slice(2) : digits
    }

    onSubmit() {
        console.log('[Signup] submit clicked')

        const form = this.signUpFormService.form

        if (form.invalid) {
            form.markAllAsTouched()
            console.log('[Signup] invalid form', form.errors, form.value)
            this.toast.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Form is invalid!',
            })
            return
        }

        this.loading = true

        const { fullName, identifier, password, confirmPassword } =
            this.signUpFormService.getValue()

        const email = this.isEmail(identifier) ? identifier : null
        const phone = email ? null : this.normalizePhone(identifier)

        const payload = {
            fullName,
            email,
            phone,
            password,
            confirmPassword,
            countryId: null,
            regionId: null,
            districtId: null,
            subDistrictId: null,
        }

        console.log('[Signup] final payload:', payload)

        this.signupApi.signup(payload).subscribe({
            next: () => {
                this.toast.add({
                    severity: 'success',
                    summary: 'Verify Account',
                    detail: 'OTP sent for verification',
                })

                this.otpState.clearOtpState()
                this.otpState.setIdentifier(identifier)
                this.otpState.setOtpType(OtpType.Verification)

                this.otpState.sendOtp().subscribe(() => {
                    this.loading = false
                    this.router.navigate(['/verifiedotp'])
                })
            },
            error: (err) => {
                console.error('[Signup] failed', err)
                this.loading = false
                this.toast.add({
                    severity: 'error',
                    summary: 'Signup Failed',
                    detail: err?.error?.message ?? 'Try again',
                })
            },
        })
    }
}
