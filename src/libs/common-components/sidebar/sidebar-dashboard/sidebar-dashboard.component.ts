import { CommonModule } from '@angular/common'
import { Component, inject } from '@angular/core'
import { RouterModule } from '@angular/router'
import { TableModule } from 'primeng/table'
import { AuthService } from '../../../auth/service/auth.service'
@Component({
    selector: 'app-sidebar-dashboard',
    imports: [RouterModule, CommonModule, TableModule],
    templateUrl: './sidebar-dashboard.component.html',
    styleUrl: './sidebar-dashboard.component.css',
})
export class SidebarDashboardComponent {
    private authService = inject(AuthService)
    isCentralizedOpen = false

    toggleCentralizedMenu() {
        this.isCentralizedOpen = !this.isCentralizedOpen
    }
    logOut() {
        this.authService.logout()
    }
}
