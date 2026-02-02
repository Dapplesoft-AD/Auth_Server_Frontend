import { CommonModule } from '@angular/common'
import { Component, inject, OnDestroy, OnInit } from '@angular/core'
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms'
import { Router, RouterModule } from '@angular/router'
import { MessageService } from 'primeng/api'
import { ButtonModule } from 'primeng/button'
import { InputOtpModule } from 'primeng/inputotp'
import { Message } from 'primeng/message'
import { ToastModule } from 'primeng/toast'
import { OtpStateService } from '../../../../libs/otp/otp-state.service'
import { OtpType } from '../../../../libs/otp/otpType.enum'

@Component({
    selector: 'app-otp-template',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        InputOtpModule,
        ToastModule,
        ButtonModule,
        RouterModule,
        Message,
    ],
    providers: [MessageService],
    templateUrl: './page-verifiedotp.component.html',
})
export class PageVerifiedotpComponent implements OnInit, OnDestroy {
    loading = false

    otpControl = new FormControl<string>('', {
        nonNullable: true,
        validators: [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(4),
            Validators.pattern(/^\d{4}$/),
        ],
    })

    private router = inject(Router)
    private messageService = inject(MessageService)
    otpStateService = inject(OtpStateService)

    ngOnInit() {
        const state = this.otpStateService.getState()

        console.log('[OTP] verifiedotp init state:', state)

        if (!state.identifier) {
            this.messageService.add({
                severity: 'warn',
                summary: 'Missing Info',
                detail: 'Please enter email or phone first',
                life: 3000,
            })
            setTimeout(() => this.router.navigate(['/verified']), 3000)
            return
        }
    }

    ngOnDestroy() {}

    onSubmit() {
        // ensure user can retry
        this.otpControl.markAsTouched()

        if (!this.otpStateService.isOtpValid()) {
            this.messageService.add({
                severity: 'error',
                summary: 'OTP Expired',
                detail: 'OTP has expired. Please resend.',
            })
            return
        }

        if (this.otpControl.invalid) {
            console.log(
                '[OTP] invalid otpControl:',
                this.otpControl.errors,
                this.otpControl.value,
            )
            this.messageService.add({
                severity: 'error',
                summary: 'Invalid OTP',
                detail: 'OTP must be 4 digits',
            })
            return
        }

        const otp = this.otpControl.value.trim()

        console.log('[OTP] submitting otp:', otp)
        console.log(
            '[OTP] state before verify:',
            this.otpStateService.getState(),
        )

        this.loading = true
        this.otpStateService.setOtpCode(otp)

        this.otpStateService.verifyOtp().subscribe({
            next: () => {
                this.loading = false
                const s = this.otpStateService.getState()

                console.log('[OTP] verify result state:', s)

                if (s.verificationStatus === 'verified') {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Verified',
                        detail: 'OTP verified successfully',
                        life: 1200,
                    })
                    const { otpType } = this.otpStateService.getState()

                    if (otpType === OtpType.Verification) {
                        setTimeout(() => this.router.navigate(['/login']), 1200)
                    } else if (otpType === OtpType.PasswordReset) {
                        setTimeout(() => this.router.navigate(['/reset']), 1200)
                    } else {
                        setTimeout(() => this.router.navigate(['/login']), 1200)
                    }
                } else {
                    // ✅ IMPORTANT: allow re-typing after wrong OTP
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Wrong OTP',
                        detail: s.errorMessage || 'Incorrect OTP',
                    })

                    // reset input so user can type again
                    this.otpControl.reset('')
                    this.otpControl.markAsUntouched()
                }
            },
            error: (err) => {
                this.loading = false
                console.error('[OTP] verifyOtp error:', err)

                this.messageService.add({
                    severity: 'error',
                    summary: 'Wrong OTP',
                    detail: 'Incorrect OTP',
                })

                // reset input so user can type again
                this.otpControl.reset('')
                this.otpControl.markAsUntouched()
            },
        })
    }

    resendOtp() {
        this.loading = true

        // reset UI first
        this.otpControl.reset('')
        this.otpControl.markAsUntouched()

        this.otpStateService.resendOtp().subscribe({
            next: () => {
                this.loading = false
                console.log(
                    '[OTP] resend ok state:',
                    this.otpStateService.getState(),
                )

                this.messageService.add({
                    severity: 'success',
                    summary: 'OTP Sent',
                    detail: 'A new OTP has been sent',
                })
            },
            error: (err) => {
                this.loading = false
                console.error('[OTP] resend error:', err)

                this.messageService.add({
                    severity: 'error',
                    summary: 'Failed',
                    detail: 'Could not resend OTP',
                })
            },
        })
    }
}
