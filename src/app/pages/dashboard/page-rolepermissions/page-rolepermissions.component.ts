import { Component } from '@angular/core'
import { ToastModule } from 'primeng/toast'

@Component({
    selector: 'app-page-rolepermissions',
    standalone: true,
    imports: [ToastModule],
    templateUrl: './page-rolepermissions.component.html',
})
export class RolePermissionsRoutes {
    loading = false

    columns = [
        { field: 'role', header: 'Role' },
        { field: 'permission', header: 'Permission' },
        { field: 'description', header: 'Description' },
        { field: 'status', header: 'Status' },
    ]

    data = [
        {
            role: 'Admin',
            permission: 'Read/Write',
            description: 'Full Access',
            status: 'Active',
        },
        {
            role: 'User',
            permission: 'Read Only',
            description: 'Limited Access',
            status: 'Inactive',
        },
        {
            role: 'Admin',
            permission: 'Read/Write',
            description: 'Full Access',
            status: 'Active',
        },
        {
            role: 'User',
            permission: 'Read Only',
            description: 'Limited Access',
            status: 'Inactive',
        },
    ]

    editRow(row: any) {
        console.log('Edit row:', row)
        alert(`Edit role: ${row.role}, permission: ${row.permission}`)
    }

    deleteRow(row: any) {
        this.data = this.data.filter((d) => d !== row)
        console.log('Deleted row:', row)
    }
}
