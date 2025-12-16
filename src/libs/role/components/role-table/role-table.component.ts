import { CommonModule } from '@angular/common'
import { Component, inject } from '@angular/core'
import { DialogService } from 'primeng/dynamicdialog'
import { AlertService } from '../../../common-service/lib/alert.service'
import { PrimeModules } from '../../../prime-modules'
import { Role } from '../../role.model'
import { RoleListStateService } from '../../role-state.service'
import { CreateRoleModalComponent } from '../role-modal/role-modal.component'

@Component({
    selector: 'app-role-table',
    imports: [CommonModule, PrimeModules],
    templateUrl: './role-table.component.html',
    styleUrl: './role-table.component.css',
})
export class RoleTableComponent {
    protected roleListStateService = inject(RoleListStateService)
    private dialogService = inject(DialogService)
    private alertService = inject(AlertService)

    addRole() {
        const ref = this.dialogService.open(CreateRoleModalComponent, {
            header: 'Add role',
            width: '50%',
            closable: true,
        })

        ref?.onClose.subscribe((role) => {
            if (role) {
                this.roleListStateService.init()
            }
        })
    }

    editRole(role: Role) {
        const ref = this.dialogService.open(CreateRoleModalComponent, {
            header: 'Edit Role',
            width: '50%',
            closable: true,
            data: { role },
        })

        ref?.onClose.subscribe((updatedRole) => {
            if (updatedRole) {
                this.roleListStateService.init()
            }
        })
    }

    confirmDelete(role: Role) {
        this.roleListStateService.deleteRole(role.id).subscribe({
            next: () => {
                this.alertService.success('Role deleted successfully')
            },
            error: () => {
                this.alertService.error('Failed role delete')
            },
        })
    }
}
