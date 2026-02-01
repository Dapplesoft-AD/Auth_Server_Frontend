import { Injectable, inject } from '@angular/core'
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms'
import { FormValidationErrorsService } from '../../common-service/lib/form-validation-errors.service'
import { passwordMatchValidator } from '../../common-service/lib/password-match.validator'
import { SignUpRequest } from './signup.model'

@Injectable()
export class SignUpFormService {
    private fb = inject(NonNullableFormBuilder)
    private formError = inject(FormValidationErrorsService)

    form = this.buildForm()

    buildForm(): FormGroup {
        const { required, minLength, pattern } = Validators

        return this.fb.group(
            {
                fullName: [
                    '',
                    [
                        required,
                        minLength(3),
                        pattern(/^[A-Za-z]+(?: [A-Za-z]+)*$/),
                    ],
                ],

                // ✅ SINGLE input for email OR phone
                identifier: ['', [required, this.emailOrPhoneValidator]],

                // ❌ NOT required anymore
                email: [''],
                phone: [''],

                password: ['', [required, minLength(8)]],
                confirmPassword: ['', [required, minLength(8)]],
            },
            {
                validators: passwordMatchValidator(),
            },
        )
    }

    private emailOrPhoneValidator(control: any) {
        const v = String(control.value ?? '').trim()
        if (!v) return null

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        const phoneRegex = /^(?:\+?88)?01[3-9]\d{8}$/ // BD phone

        return emailRegex.test(v) || phoneRegex.test(v)
            ? null
            : { invalidFormat: true }
    }

    controls(name: string) {
        return this.form.get(name)
    }

    getValue() {
        return this.form.getRawValue()
    }

    patchForm(data: SignUpRequest) {
        this.form.patchValue(data)
    }

    getErrorMsg(name: string): string | null {
        return this.formError.getErrorMsg(this.controls(name))
    }
}
