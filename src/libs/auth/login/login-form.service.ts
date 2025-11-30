import { Injectable, inject } from '@angular/core'
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms'
import { Login } from './login.model'

@Injectable()
export class LoginFormService {
    private fb = inject(NonNullableFormBuilder)
    form = this.buildForm()

    buildForm(): FormGroup {
        const { required, minLength, pattern } = Validators

        return this.fb.group({
            phone: ['', [required, pattern(/^\d{11}$/)]],
            password: [
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

    patchForm(data: Login) {
        this.form.patchValue(data)
    }
}
