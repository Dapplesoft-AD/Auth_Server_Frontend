import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { MessageService } from 'primeng/api'
import { ButtonModule } from 'primeng/button'
import { DialogModule } from 'primeng/dialog'
import { InputTextModule } from 'primeng/inputtext'
import { TableModule } from 'primeng/table'
import { ToastModule } from 'primeng/toast'
import { Role } from '../../../../../libs/role/role.model'
import { RoleDataService } from '../../../../../libs/role/role-data.service'
@Component({
    selector: 'app-page-roles',
    standalone: true,
    imports: [
        CommonModule,
        TableModule,
        ButtonModule,
        DialogModule,
        InputTextModule,
        ToastModule,
        FormsModule,
    ],
    templateUrl: './page-roles.component.html',
    providers: [MessageService],
})
export class PageRolesComponent implements OnInit {
    roles: Role[] = []
    displayDialog = false
    selectedRole: Role | null = null
    roleForm: { role_name: string; description: string } = {
        role_name: '',
        description: '',
    }

    constructor(
        private roleService: RoleDataService,
        private messageService: MessageService,
    ) {}

    ngOnInit(): void {
        this.roleService.loadRoles().subscribe((data: Role[]) => {
            this.roles = data
        })
    }

    openAddDialog() {
        this.selectedRole = null
        this.roleForm = { role_name: '', description: '' }
        this.displayDialog = true
    }

    openEditDialog(role: Role) {
        this.selectedRole = role
        this.roleForm = {
            role_name: role.role_name,
            description: role.description,
        }
        this.displayDialog = true
    }

    cancelDialog() {
        this.displayDialog = false
    }

    saveRole() {
        if (this.selectedRole) {
            this.selectedRole.role_name = this.roleForm.role_name
            this.selectedRole.description = this.roleForm.description

            this.messageService.add({
                severity: 'success',
                summary: 'Updated',
                detail: `Role ID ${this.selectedRole.id} updated`,
            })
        } else {
            const newRole: Role = {
                id: this.roles.length
                    ? Math.max(...this.roles.map((r) => r.id)) + 1
                    : 1,
                role_name: this.roleForm.role_name,
                description: this.roleForm.description,
            }
            this.roles.push(newRole)
            this.messageService.add({
                severity: 'success',
                summary: 'Added',
                detail: `Role ${newRole.role_name} added`,
            })
        }

        this.displayDialog = false
    }

    deleteRole(role: Role) {
        if (confirm(`Are you sure you want to delete role ID ${role.id}?`)) {
            this.roles = this.roles.filter((r) => r.id !== role.id)
            this.messageService.add({
                severity: 'success',
                summary: 'Deleted',
                detail: `Role ID ${role.id} deleted`,
            })
        }
    }

    viewRole(role: Role) {
        console.log('View role:', role)
    }
}
