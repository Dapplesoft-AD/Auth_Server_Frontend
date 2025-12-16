import { Injectable } from '@angular/core'
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms'
import { District } from './districts.model'

@Injectable({
    providedIn: 'root',
})
export class DistrictFormService {
    form: FormGroup

    constructor(private fb: NonNullableFormBuilder) {
        this.form = this.buildForm()
    }

    buildForm(): FormGroup {
        const { required, minLength } = Validators

        return this.fb.group({
            id: [''],
            countryId: ['', [required, minLength(3)]],
            regionId: ['', [required, minLength(3)]],
            name: ['', [required, minLength(3)]],
            isActive: [true, [required]],
        })
    }

    controls(control: string) {
        return this.form.get(control)
    }

    getValue(): District {
        return this.form.getRawValue() as District
    }

    patchForm(district: District) {
        this.form.patchValue({
            id: district.id,
            countryId: district.countryId,
            regionId: district.regionId,
            name: district.name,
            isActive: district.isActive,
        })
    }

    resetForm() {
        this.form.reset({
            id: '',
            countryId: '',
            regionId: '',
            name: '',
            isActive: true,
        })
    }
}
