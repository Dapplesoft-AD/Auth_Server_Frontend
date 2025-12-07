// import { Injectable } from '@angular/core'
// import {
//     FormBuilder,
//     FormGroup,
//     NonNullableFormBuilder,
//     Validators,
// } from '@angular/forms'
// import { AbstractFormService } from '../common-service/lib/abstract-form.service'
// import { Role, RoleDto } from './role.model'
// import { RoleApiService } from './role-api.service'

// @Injectable({
//     providedIn: 'root',
// })
// export class RoleFormService {
//     form: FormGroup
//     constructor(private fb: NonNullableFormBuilder) {
//         this.form = this.buildForm()
//     }

//     buildForm(): FormGroup {
//         const { required, minLength } = Validators
//         return this.fb.group({
//             Id: ['', [required]],
//             roleName: ['', [required, minLength(3)]],
//             description: ['', [required, minLength(3)]],
//         })
//     }

//     controls(control: string) {
//         return this.form.get(control)
//     }

//     getValue() {
//         return this.form.getRawValue()
//     }

//     patchForm(data: Role) {
//         this.form.patchValue(data)
//     }
// }
