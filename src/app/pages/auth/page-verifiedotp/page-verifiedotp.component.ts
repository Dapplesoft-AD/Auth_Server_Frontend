import { CommonModule } from '@angular/common'
import { Component, inject } from '@angular/core'
import { FormsModule, NgForm } from '@angular/forms'
import { Router, RouterModule } from '@angular/router'
import { MessageService } from 'primeng/api'
import { ButtonModule } from 'primeng/button'
import { InputOtpModule } from 'primeng/inputotp'
import { MessageModule } from 'primeng/message'
import { ToastModule } from 'primeng/toast'
@Component({
    selector: 'app-otp-template',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        InputOtpModule,
        MessageModule,
        ToastModule,
        ButtonModule,
        RouterModule,
    ],
    providers: [MessageService],
    templateUrl: './page-verifiedotp.component.html',
})
export class PageVerifiedotpComponent {
    value = ''
    router = inject(Router)
    messageService = inject(MessageService)
    allowNumbersOnly(event: KeyboardEvent) {
        const allowed = /[0-9]/
        if (!allowed.test(event.key)) {
            event.preventDefault()
        }
    }

    onSubmit(form: NgForm) {
        if (form.invalid || this.value.length < 4) {
            this.messageService.add({
                severity: 'error',
                summary: 'Invalid OTP',
                detail: 'Please enter a valid 4-digit OTP',
                life: 2000,
            })
            return
        }

        this.messageService.add({
            severity: 'success',
            summary: 'OTP Verified',
            detail: 'OTP verified successfully! Redirecting...',
            life: 1500,
        })

        setTimeout(() => this.router.navigate(['/reset']), 1500)
    }
}
