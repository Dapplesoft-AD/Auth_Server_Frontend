import { Injectable, inject } from '@angular/core'
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms'
import { passwordMatchValidator } from './password-match.validator'
import { SignUpRequest } from './signup.model'

@Injectable()
export class SingUpFormService {
    private fb = inject(NonNullableFormBuilder)
    form = this.buildForm()

    buildForm(): FormGroup {
        const { required, email, minLength, pattern, maxLength, requiredTrue } =
            Validators

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

                phone: ['', [maxLength(13), pattern(/[0-9]/)]],

                email: ['', [required, email]],

                password: [
                    '',
                    [
                        required,
                        minLength(8),
                        // pattern(/[A-Z]/),  // at one uppercase
                        // pattern(/[a-z]/), // at one lowercase
                        // pattern(/[0-9]/), // at one number
                        // pattern(/[^A-Za-z0-9]/), // at one lower special char
                    ],
                ],

                confirmPassword: ['', [required, minLength(8)]],

                acceptTerms: [false, requiredTrue],
            },
            {
                validators: passwordMatchValidator,
            },
        )
    }

    controls(control: string) {
        return this.form.get(control)
    }

    getValue() {
        return this.form.getRawValue()
    }

    patchForm(data: SignUpRequest) {
        this.form.patchValue(data)
    }
}
