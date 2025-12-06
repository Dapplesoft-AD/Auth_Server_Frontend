import { CommonModule } from '@angular/common'
import { Component, inject } from '@angular/core'
import { PrimeModules } from '../../../prime-modules'
import { RoleListStateService } from '../../role-list-state.service'

@Component({
    selector: 'app-role-table',
    imports: [CommonModule, PrimeModules],
    templateUrl: './role-table.component.html',
    styleUrl: './role-table.component.css',
})
export class RoleTableComponent {
    protected roleListStateService = inject(RoleListStateService)
}
