// import { CommonModule } from '@angular/common'
// import { Component, inject, signal } from '@angular/core'
// import { FormsModule, ReactiveFormsModule } from '@angular/forms'
// import { DynamicDialogRef } from 'primeng/dynamicdialog'
// import { AlertService } from '../../../common-service/lib/alert.service'
// import { PrimeModules } from '../../../prime-modules'
// import { RoleDto } from '../../role.model'
// import { RoleApiService } from '../../role-api.service'
// import { RoleFormService } from '../../role-form.service'
// import { RoleListStateService } from '../../role-list-state.service'

// @Component({
//     selector: 'app-create-role-modal',
//     imports: [CommonModule, PrimeModules, FormsModule, ReactiveFormsModule],
//     templateUrl: './create-role-modal.component.html',
//     styleUrls: ['./create-role-modal.component.css'],
//     providers: [RoleListStateService],
//     standalone: true,
// })
// export class CreateRoleModalComponent {
//     protected roleFormService = inject(RoleFormService)
//     private roleApiService = inject(RoleApiService)
//     private roleListStateService = inject(RoleListStateService)
//     private alertService = inject(AlertService)
//     private ref = inject(DynamicDialogRef)

//     isLoading = signal<boolean>(false)
//     isError = signal<boolean>(false)

//     /** Form submit */
//     submit(event: Event) {
//         event.preventDefault()
//         if (this.roleFormService.form.invalid) return

//         this.isLoading.set(true)

//         const formValue = this.roleFormService.getValue()
//         const roleData: RoleDto = {
//             role_name: formValue.role_name,
//             description: formValue.description,
//         }

//         this.createRole(roleData)
//     }

//     /** Call API to create role */
//     private createRole(role: RoleDto) {
//         this.roleApiService.crateNewRole(role).subscribe({
//             next: (res) => {
//                 this.roleFormService.form.reset()
//                 this.isLoading.set(false)
//                 this.ref.close(res)
//                 this.alertService.success('Role created successfully')
//             },
//             error: () => {
//                 this.isLoading.set(false)
//                 this.isError.set(true)
//                 this.alertService.error('Failed to create role')
//             },
//         })
//     }
// }
