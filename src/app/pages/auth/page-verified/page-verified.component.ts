import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms'
import { Router } from '@angular/router'
import { MessageService } from 'primeng/api'
import { ButtonModule } from 'primeng/button'
import { FloatLabelModule } from 'primeng/floatlabel'
import { InputMaskModule } from 'primeng/inputmask'
import { ToastModule } from 'primeng/toast'
@Component({
    selector: 'app-verified',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ButtonModule,
        InputMaskModule,
        ToastModule,
        FloatLabelModule,
    ],
    templateUrl: './page-verified.component.html',
    providers: [MessageService],
})
export class PageVerifiedComponent {
    form: FormGroup
    selectedTab: 'email' | 'phone' = 'email'
    submitted = false

    constructor(
        private fb: FormBuilder,
        private messageService: MessageService,
        private router: Router,
    ) {
        this.form = this.fb.group({
            email: ['', [Validators.email]],
            phone: [''],
        })
        this.setValidators()
    }

    selectTab(tab: 'email' | 'phone') {
        this.selectedTab = tab
        this.submitted = false
        this.setValidators()
    }

    setValidators() {
        if (this.selectedTab === 'email') {
            this.form
                .get('email')
                ?.setValidators([Validators.required, Validators.email])
            this.form.get('phone')?.clearValidators()
        } else {
            this.form.get('phone')?.setValidators([Validators.required])
            this.form.get('email')?.clearValidators()
        }
        this.form.get('email')?.updateValueAndValidity()
        this.form.get('phone')?.updateValueAndValidity()
    }

    get f() {
        return this.form.controls
    }

    onSubmit() {
        this.submitted = true

        if (this.form.invalid) {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Please fill in the required fields correctly.',
            })
            return
        }

        const payload =
            this.selectedTab === 'email'
                ? { email: this.form.value.email }
                : { phone: this.form.value.phone }

        console.log('Send OTP to:', payload)

        this.messageService.add({
            severity: 'success',
            summary: 'OTP Sent',
            detail: `OTP sent to ${this.selectedTab}`,
        })

        setTimeout(() => {
            this.router.navigate(['/verifiedotp'], {
                state: {
                    method: this.selectedTab,
                    value:
                        this.selectedTab === 'email'
                            ? this.form.value.email
                            : this.form.value.phone,
                },
            })
        }, 1500)
    }
}
