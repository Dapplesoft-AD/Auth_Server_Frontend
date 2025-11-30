import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { Permission } from './permission.model'

@Injectable({
    providedIn: 'root',
})
export class PermissionsDataService {
    private permissions: Permission[] = [
        {
            id: 1n,
            code: 'CAN_VIEW_REPORTS',
            description: 'User can view reports',
        },
        {
            id: 2n,
            code: 'CAN_DELETE_USER',
            description: 'User can delete other users',
        },
        {
            id: 3n,
            code: 'CAN_EDIT_BUSINESS',
            description: 'User can edit business details',
        },
        {
            id: 4n,
            code: 'CAN_MANAGE_ROLES',
            description: 'User can assign roles',
        },
        {
            id: 5n,
            code: 'CAN_MANAGE_PERMISSIONS',
            description: 'User can assign permissions',
        },
    ]

    getPermissions(): Observable<Permission[]> {
        return of(this.permissions)
    }

    addPermission(permission: Permission): Observable<Permission> {
        const newId = this.permissions.length
            ? BigInt(Math.max(...this.permissions.map((p) => Number(p.id))) + 1)
            : 1n
        const newPermission: Permission = { ...permission, id: newId }
        this.permissions.push(newPermission)
        return of(newPermission)
    }

    updatePermission(permission: Permission): Observable<Permission> {
        const index = this.permissions.findIndex((p) => p.id === permission.id)
        if (index > -1) this.permissions[index] = permission
        return of(permission)
    }

    deletePermission(id: bigint): Observable<void> {
        this.permissions = this.permissions.filter((p) => p.id !== id)
        return of(undefined)
    }
}
