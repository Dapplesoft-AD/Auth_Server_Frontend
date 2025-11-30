import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { Permission } from './permission.model'
import { PermissionsDataService } from './permission-data.service'

@Injectable({
    providedIn: 'root',
})
export class PermissionsStateService {
    private _permissions$ = new BehaviorSubject<Permission[]>([])
    public permissions$ = this._permissions$.asObservable()

    constructor(private dataService: PermissionsDataService) {
        this.loadPermissions()
    }

    loadPermissions() {
        this.dataService
            .getPermissions()
            .subscribe((data) => this._permissions$.next(data))
    }

    addPermission(permission: Permission) {
        this.dataService.addPermission(permission).subscribe((p) => {
            const updated = [...this._permissions$.getValue(), p]
            this._permissions$.next(updated)
        })
    }

    updatePermission(permission: Permission) {
        this.dataService.updatePermission(permission).subscribe((p) => {
            const updated = this._permissions$
                .getValue()
                .map((item) => (item.id === p.id ? p : item))
            this._permissions$.next(updated)
        })
    }

    deletePermission(id: bigint) {
        this.dataService.deletePermission(id).subscribe(() => {
            const updated = this._permissions$
                .getValue()
                .filter((p) => p.id !== id)
            this._permissions$.next(updated)
        })
    }
}
