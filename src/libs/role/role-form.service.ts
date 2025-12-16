import { Injectable } from '@angular/core'
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms'
import { Role, RoleDto } from './role.model'

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
            roleName: ['', [required, minLength(2)]],
            description: ['', [required, minLength(3)]],
        })
    }

    controls(control: string) {
        return this.form.get(control)
    }

    getValue(): RoleDto {
        return this.form.getRawValue()
    }

    patchForm(role: Role) {
        this.form.patchValue({
            roleName: role.roleName,
            description: role.description,
        })
    }

    resetForm() {
        this.form.reset({
            roleName: '',
            description: '',
        })
    }
}
