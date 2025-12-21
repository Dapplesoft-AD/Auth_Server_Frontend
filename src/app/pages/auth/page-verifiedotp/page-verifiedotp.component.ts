import { CommonModule } from '@angular/common'
import { Component, inject, OnDestroy, OnInit } from '@angular/core'
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms'
import { Router, RouterModule } from '@angular/router'
import { MessageService } from 'primeng/api'
import { ButtonModule } from 'primeng/button'
import { InputOtpModule } from 'primeng/inputotp'
import { MessageModule } from 'primeng/message'
import { ToastModule } from 'primeng/toast'
import { OtpStateService } from '../../../../libs/otp/otp-state.service'

@Component({
    selector: 'app-otp-template',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        InputOtpModule,
        MessageModule,
        ToastModule,
        ButtonModule,
        RouterModule,
    ],
    providers: [MessageService],
    templateUrl: './page-verifiedotp.component.html',
})
export class PageVerifiedotpComponent implements OnInit, OnDestroy {
    loading = false

    otpControl = new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(4),
    ])

    router = inject(Router)
    messageService = inject(MessageService)
    otpStateService = inject(OtpStateService)

    ngOnInit() {
        const state = this.otpStateService.getState()

        if (!state.identifier) {
            this.messageService.add({
                severity: 'warn',
                summary: 'Missing Info',
                detail: 'Please enter email or phone first',
                life: 3000,
            })
            setTimeout(() => this.router.navigate(['/verified']), 3000)
        }
    }

    ngOnDestroy() {}

    onSubmit() {
        if (!this.otpStateService.isOtpValid()) {
            this.messageService.add({
                severity: 'error',
                summary: 'OTP Expired',
                detail: 'OTP has expired. Please resend.',
            })
            return
        }

        if (this.otpControl.invalid) {
            this.messageService.add({
                severity: 'error',
                summary: 'Invalid OTP',
                detail: 'OTP must be 4 digits',
            })
            return
        }

        this.loading = true
        this.otpStateService.setOtpCode(this.otpControl.value!)

        this.otpStateService.verifyOtp().subscribe({
            next: () => {
                this.loading = false
                const s = this.otpStateService.getState()

                if (s.verificationStatus === 'verified') {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Verified',
                        detail: 'OTP verified successfully',
                        life: 1500,
                    })
                    setTimeout(() => this.router.navigate(['/reset']), 1500)
                } else {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Wrong OTP',
                        detail: s.errorMessage || 'Incorrect OTP',
                    })
                }
            },
            error: () => {
                this.loading = false
                this.messageService.add({
                    severity: 'error',
                    summary: 'Wrong OTP',
                    detail: 'Incorrect OTP',
                })
            },
        })
    }

    resendOtp() {
        this.loading = true
        this.otpControl.reset()

        this.otpStateService.resendOtp().subscribe({
            next: () => {
                this.loading = false
                this.messageService.add({
                    severity: 'success',
                    summary: 'OTP Sent',
                    detail: 'A new OTP has been sent',
                })
            },
            error: () => {
                this.loading = false
                this.messageService.add({
                    severity: 'error',
                    summary: 'Failed',
                    detail: 'Could not resend OTP',
                })
            },
        })
    }
}
