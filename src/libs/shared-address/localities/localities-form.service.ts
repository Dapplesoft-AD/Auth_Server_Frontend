import { Injectable } from '@angular/core'
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms'
import { Localitie } from './localities.model'

@Injectable({
    providedIn: 'root',
})
export class LocalitieFormService {
    form: FormGroup

    constructor(private fb: NonNullableFormBuilder) {
        this.form = this.buildForm()
    }
    buildForm(): FormGroup {
        const { required, minLength, pattern } = Validators

        return this.fb.group({
            id: [null],
            countryId: ['', [required, minLength(3)]],
            areaId: ['', [required, minLength(3)]],
            name: ['', [required, minLength(3)]],
            type: ['', [required, minLength(0)]],
            typeName: ['', [required, minLength(1)]],
        })
    }
    controls(control: string) {
        return this.form.get(control)
    }

    getValue() {
        return this.form.getRawValue()
    }
    patchForm(data: Localitie) {
        this.form.patchValue(data)
    }
}
