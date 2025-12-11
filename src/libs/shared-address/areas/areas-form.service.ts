import { Injectable } from '@angular/core'
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms'
import { Area } from './areas.model'

@Injectable({
    providedIn: 'root',
})
export class AreaFormService {
    form: FormGroup

    constructor(private fb: NonNullableFormBuilder) {
        this.form = this.buildForm()
    }
    buildForm(): FormGroup {
        const { required, minLength } = Validators

        return this.fb.group({
            id: [null],
            countryId: ['', [required, minLength(3)]],
            districtId: ['', [required, minLength(3)]],
            name: ['', [required, minLength(3)]],
            typeName: ['', [required, minLength(1)]],
            type: ['', [required, minLength(0)]],
        })
    }
    controls(control: string) {
        return this.form.get(control)
    }

    getValue() {
        return this.form.getRawValue()
    }
    patchForm(data: Area) {
        this.form.patchValue(data)
    }
}
