import { Component, inject, OnInit } from '@angular/core'
import { PrimeModules } from '../../../../libs/prime-modules'
import { RoleListStateService } from '../../../../libs/role'
import { RoleTableComponent } from '../../../../libs/role/components/role-table/role-table.component'

@Component({
    selector: 'app-page-role',
    imports: [RoleTableComponent, PrimeModules],
    templateUrl: './page-roles.component.html',
    styleUrl: './page-roles.component.css',
    providers: [RoleListStateService],
})
export class PageRolesComponent implements OnInit {
    private roleListStateService = inject(RoleListStateService)

    ngOnInit(): void {
        this.roleListStateService.init()
    }
}
