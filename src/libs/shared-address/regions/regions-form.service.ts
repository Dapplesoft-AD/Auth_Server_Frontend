import { Injectable } from '@angular/core'
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms'
import { Region } from './regions.model'

@Injectable({
    providedIn: 'root',
})
export class RegionFormService {
    form: FormGroup

    constructor(private fb: NonNullableFormBuilder) {
        this.form = this.buildForm()
    }
    buildForm(): FormGroup {
        const { required, minLength, pattern } = Validators

        return this.fb.group({
            id: [null],
            countryId: ['', [required, minLength(3)]],
            name: ['', [required, minLength(3)]],
            regionType: ['', [required, minLength(3)]],
            isActive: [true, [required]],
        })
    }
    controls(control: string) {
        return this.form.get(control)
    }

    getValue() {
        return this.form.getRawValue()
    }
    patchForm(data: Region) {
        this.form.patchValue(data)
    }
}
