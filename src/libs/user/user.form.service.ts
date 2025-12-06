import { Injectable } from '@angular/core'
import {
    FormBuilder,
    FormGroup,
    NonNullableFormBuilder,
    Validators,
} from '@angular/forms'
import { User } from './user.model'

@Injectable({
    providedIn: 'root',
})
export class UserFormService {
    form: FormGroup
    constructor(private fb: NonNullableFormBuilder) {
        this.form = this.buildForm()
    }

    buildForm(): FormGroup {
        const { required, minLength, email } = Validators
        return this.fb.group({
            email: ['', [email]],
            fullName: ['', [minLength(3)]],
            phone: ['', [minLength(11)]],
            role: ['', []],
        })
    }

    controls(control: string) {
        return this.form.get(control)
    }

    getValue() {
        return this.form.getRawValue()
    }

    patchForm(data: User) {
        this.form.patchValue(data)
    }
}
