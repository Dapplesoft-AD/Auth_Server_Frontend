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
            id: [''],
            name: ['', [required, minLength(3)]],
            capital: ['', [required, minLength(3)]],
            phoneCode: ['', [required, pattern(/^\+[0-9]+$/)]],
            isActive: [true, [required]],
        })
    }

    controls(control: string) {
        return this.form.get(control)
    }

    getValue(): Country {
        return this.form.getRawValue() as Country
    }

    patchForm(country: Country) {
        this.form.patchValue({
            id: country.id,
            name: country.name,
            capital: country.capital,
            phoneCode: country.phoneCode,
            isActive: country.isActive,
        })
    }

    resetForm() {
        this.form.reset({
            id: '',
            name: '',
            capital: '',
            phoneCode: '',
            isActive: true,
        })
    }
}
