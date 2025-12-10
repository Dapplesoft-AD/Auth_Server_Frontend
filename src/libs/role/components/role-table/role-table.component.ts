import { CommonModule } from '@angular/common'
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    inject,
} from '@angular/core'
import { ConfirmationService } from 'primeng/api'
import { ButtonModule } from 'primeng/button'
import { ConfirmDialogModule } from 'primeng/confirmdialog'
import { DialogService } from 'primeng/dynamicdialog'
import { IconFieldModule } from 'primeng/iconfield'
import { InputIconModule } from 'primeng/inputicon'
import { InputTextModule } from 'primeng/inputtext'
import { TableModule } from 'primeng/table'
import { AlertService } from '../../../common-service/lib/alert.service'
import { Role } from '../../role.model'
import { RoleStateService } from '../../role-state.service'

import { EditRoleModalComponent } from '../edit-role-modal/edit-role-modal.component'

@Component({
    selector: 'app-role-table',
    imports: [
        CommonModule,
        TableModule,
        IconFieldModule,
        ButtonModule,
        InputIconModule,
        InputTextModule,
        ConfirmDialogModule,
    ],
    standalone: true,
    templateUrl: './role-table.component.html',
    styleUrl: './role-table.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoleTableComponent {
    roles: Role[] = []
    private dialogService = inject(DialogService)
    private alertService = inject(AlertService)

    isLoading = false

    constructor(
        private roleState: RoleStateService,
        private confirmationService: ConfirmationService,
        private cdr: ChangeDetectorRef,
    ) {}

    ngOnInit(): void {
        this.isLoading = true
        this.roleState.roles$.subscribe({
            next: (data) => {
                this.roles = data
                this.isLoading = false
                this.cdr.markForCheck()
            },
        })
        this.roleState.loadRoles()
    }

    openModal(role?: Role) {
        this.dialogService.open(EditRoleModalComponent, {
            header: role ? 'Edit Role' : 'Add Role',
            data: { role: role ?? null },
            width: '50%',
            closable: true,
            baseZIndex: 10000,
        })
    }

    deleteRole(role: Role) {
        this.confirmationService.confirm({
            header: 'Delete Confirmation',
            message: `Are you sure you want to delete ${role.roleName}?`,
            accept: () => {
                this.roleState.deleteRole(role.id).subscribe({
                    next: () => {
                        this.alertService.success(
                            `Role ${role.roleName} deleted successfully`,
                        )
                    },
                    error: (err) => {
                        this.alertService.error('Delete role failed')
                    },
                })
            },
        })
    }
}
