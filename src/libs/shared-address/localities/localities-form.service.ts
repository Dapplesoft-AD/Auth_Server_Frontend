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
        const { required, minLength } = Validators

        return this.fb.group({
            id: [''],
            countryId: ['', [required, minLength(3)]],
            areaId: ['', [required, minLength(3)]],
            name: ['', [required, minLength(3)]],
            type: ['', [required, minLength(0)]],
            typeName: ['', [required, minLength(1)]],
            isActive: [true, [required]],
        })
    }

    controls(control: string) {
        return this.form.get(control)
    }

    getValue(): Localitie {
        return this.form.getRawValue() as Localitie
    }

    patchForm(localitie: Localitie) {
        this.form.patchValue({
            id: localitie.id,
            countryId: localitie.countryId,
            areaId: localitie.areaId,
            name: localitie.name,
            type: localitie.type,
            typeName: localitie.typeName,
            isActive: localitie.isActive,
        })
    }

    resetForm() {
        this.form.reset({
            id: '',
            countryId: '',
            areaId: '',
            name: '',
            type: '',
            typeName: '',
            isActive: true,
        })
    }
}
