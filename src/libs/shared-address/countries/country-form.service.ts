import { Injectable } from '@angular/core'
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms'
import { Country } from './country.model'

@Injectable({
    providedIn: 'root',
})
export class CountryFormService {
    form: FormGroup

    constructor(private fb: NonNullableFormBuilder) {
        this.form = this.buildForm()
    }
    buildForm(): FormGroup {
        const { required, minLength, pattern } = Validators

        return this.fb.group({
            id: [null],
            name: ['', [required, minLength(3)]],
            capital: ['', [required, minLength(3)]],
            phoneCode: ['', [required, pattern(/^\+[0-9]+$/)]],
            isActive: [true, [required]],
        })
    }
    controls(control: string) {
        return this.form.get(control)
    }

    getValue() {
        return this.form.getRawValue()
    }
    patchForm(data: Country) {
        this.form.patchValue(data)
    }
}
