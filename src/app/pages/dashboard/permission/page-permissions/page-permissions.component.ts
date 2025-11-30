import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { MessageService } from 'primeng/api'
import { ButtonModule } from 'primeng/button'
import { DialogModule } from 'primeng/dialog'
import { InputTextModule } from 'primeng/inputtext'
import { TableModule } from 'primeng/table'
import { ToastModule } from 'primeng/toast'
import { Permission } from '../../../../../libs/permissions/permission.model'
import { PermissionsDataService } from '../../../../../libs/permissions/permission-data.service'

@Component({
    selector: 'app-page-permissions',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,

        TableModule,
        ButtonModule,
        DialogModule,
        InputTextModule,
        ToastModule,
    ],
    templateUrl: './page-permissions.component.html',
    styleUrls: ['./page-permissions.component.css'],
    providers: [MessageService],
})
export class PagePermissionsComponent implements OnInit {
    permissions: Permission[] = []
    displayDialog = false
    selectedPermission: Permission | null = null
    permissionForm: { code: string; description: string } = {
        code: '',
        description: '',
    }

    constructor(
        private permissionsService: PermissionsDataService, // <-- Corrected
        private messageService: MessageService,
    ) {}

    ngOnInit(): void {
        this.loadPermissions()
    }

    loadPermissions() {
        this.permissionsService
            .getPermissions()
            .subscribe((data: Permission[]) => {
                this.permissions = data
            })
    }

    openAddDialog() {
        this.selectedPermission = null
        this.permissionForm = { code: '', description: '' }
        this.displayDialog = true
    }

    openEditDialog(permission: Permission) {
        this.selectedPermission = { ...permission }
        this.permissionForm = {
            code: permission.code,
            description: permission.description,
        }
        this.displayDialog = true
    }

    cancelDialog() {
        this.displayDialog = false
    }

    savePermission() {
        if (this.selectedPermission) {
            const updated: Permission = {
                ...this.selectedPermission,
                ...this.permissionForm,
            }
            this.permissionsService.updatePermission(updated).subscribe((p) => {
                const index = this.permissions.findIndex((x) => x.id === p.id)
                if (index > -1) this.permissions[index] = p
                this.messageService.add({
                    severity: 'success',
                    summary: 'Updated',
                    detail: `Permission ${p.code} updated`,
                })
                this.displayDialog = false
            })
        } else {
            const newPermission: Permission = { id: 0n, ...this.permissionForm }
            this.permissionsService
                .addPermission(newPermission)
                .subscribe((p) => {
                    this.permissions.push(p)
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Added',
                        detail: `Permission ${p.code} added`,
                    })
                    this.displayDialog = false
                })
        }
    }

    deletePermission(permission: Permission) {
        if (
            confirm(
                `Are you sure you want to delete permission "${permission.code}"?`,
            )
        ) {
            this.permissionsService
                .deletePermission(permission.id)
                .subscribe(() => {
                    this.permissions = this.permissions.filter(
                        (p) => p.id !== permission.id,
                    )
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Deleted',
                        detail: `Permission ${permission.code} deleted`,
                    })
                })
        }
    }
}
