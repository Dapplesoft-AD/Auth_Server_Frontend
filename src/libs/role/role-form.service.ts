import { Injectable } from '@angular/core'
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms'

import { Role } from './role.model'

@Injectable({
    providedIn: 'root',
})
export class RoleFormService {
    form: FormGroup

    constructor(private fb: NonNullableFormBuilder) {
        this.form = this.buildForm()
    }

    buildForm(): FormGroup {
        const { required, minLength } = Validators

        return this.fb.group({
            id: [null],
            roleName: ['', [required, minLength(3)]],
            description: ['', [required, minLength(3)]],
        })
    }

    controls(control: string) {
        return this.form.get(control)
    }

    getValue() {
        return this.form.getRawValue()
    }

    patchForm(data: Role) {
        this.form.patchValue(data)
    }
}
