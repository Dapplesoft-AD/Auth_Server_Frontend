import { Injectable, inject } from '@angular/core'
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms'
import { Signup } from './signup.model'

@Injectable()
export class SingupFormService {
    private fb = inject(NonNullableFormBuilder)
    form = this.buildForm()

    buildForm(): FormGroup {
        const { required, email, minLength, pattern } = Validators

        return this.fb.group({
            email: ['', [required, email]],

            Password: [
                '',
                [
                    required,
                    minLength(8),
                    pattern(/[A-Z]/),
                    pattern(/[a-z]/),
                    pattern(/[0-9]/),
                    pattern(/[^A-Za-z0-9]/),
                ],
            ],
        })
    }

    controls(control: string) {
        return this.form.get(control)
    }

    getValue() {
        return this.form.getRawValue()
    }

    patchForm(data: Signup) {
        this.form.patchValue(data)
    }
}
