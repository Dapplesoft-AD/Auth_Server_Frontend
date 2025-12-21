// libs/otp/services/otp-form.service.ts
import { Injectable } from '@angular/core'
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms'

@Injectable({
    providedIn: 'root',
})
export class OtpFormService {
    identifierForm: FormGroup
    otpForm: FormGroup

    constructor(private fb: NonNullableFormBuilder) {
        this.identifierForm = this.buildIdentifierForm()
        this.otpForm = this.buildOtpForm()
    }

    private buildIdentifierForm(): FormGroup {
        return this.fb.group({
            email: ['', [Validators.email]],
            phone: [''],
        })
    }

    private buildOtpForm(): FormGroup {
        return this.fb.group({
            otp: [
                '',
                [
                    Validators.required,
                    Validators.minLength(4),
                    Validators.maxLength(4),
                    Validators.pattern('^[0-9]*$'),
                ],
            ],
        })
    }

    // Get identifier form value
    getIdentifierValue(): { email?: string; phone?: string } {
        return this.identifierForm.getRawValue()
    }

    // Get OTP form value
    getOtpValue(): string {
        return this.otpForm.get('otp')?.value || ''
    }

    // Reset forms
    reset() {
        this.identifierForm.reset({
            email: '',
            phone: '',
        })
        this.otpForm.reset({
            otp: '',
        })
    }

    // Set validation based on method
    setValidationMethod(method: 'email' | 'phone') {
        if (method === 'email') {
            this.identifierForm
                .get('email')
                ?.setValidators([Validators.required, Validators.email])
            this.identifierForm.get('phone')?.clearValidators()
        } else {
            this.identifierForm
                .get('phone')
                ?.setValidators([Validators.required])
            this.identifierForm.get('email')?.clearValidators()
        }

        this.identifierForm.get('email')?.updateValueAndValidity()
        this.identifierForm.get('phone')?.updateValueAndValidity()
    }
}
