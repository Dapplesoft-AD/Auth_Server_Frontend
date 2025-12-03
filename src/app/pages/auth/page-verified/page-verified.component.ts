import { CommonModule } from '@angular/common'
import { Component, inject } from '@angular/core'
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
    selector: 'app-verified',
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule, RouterModule, ToastModule],
    providers: [MessageService],
    templateUrl: './page-verified.component.html',
    styleUrls: ['./page-verified.component.css'],
})
export class PageVerifiedComponent {
    fb = inject(FormBuilder)
    router = inject(Router)
    messageService = inject(MessageService)

    form: FormGroup = this.fb.group({
        phone: [
            '',
            [
                Validators.required,
                Validators.minLength(11),
                Validators.maxLength(11),
                Validators.pattern(/^\d{11}$/),
            ],
        ],
        rememberMe: [false],
    })

    get phoneControl() {
        return this.form.get('phone')
    }

    onSubmit() {
        this.form.markAllAsTouched()

        if (this.form.valid) {
            const phone = this.form.value.phone
            console.log('Phone is valid ->', phone)

            this.messageService.add({
                severity: 'success',
                summary: 'OTP Sent!',
                detail: `OTP was sent to ${phone}`,
                life: 1500,
            })

            setTimeout(() => this.router.navigate(['/verifiedotp']), 1500)
        } else {
            console.log(
                'Form invalid, errors:',
                this.form.errors,
                this.phoneControl?.errors,
            )

            this.messageService.add({
                severity: 'error',
                summary: 'Invalid Phone',
                detail: 'Please enter a valid 11-digit phone number.',
                life: 2000,
            })
        }
    }

    onPhoneInput(event: Event) {
        const input = event.target as HTMLInputElement
        input.value = input.value.replace(/\D/g, '').slice(0, 11)
        this.phoneControl?.setValue(input.value, { emitEvent: false })
    }
}
