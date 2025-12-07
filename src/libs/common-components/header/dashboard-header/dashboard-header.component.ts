import { Component, inject } from '@angular/core'
import { Router, RouterModule } from '@angular/router'
import { AuthService } from '../../../auth/service/auth.service'
@Component({
    selector: 'app-dashboard-header',
    imports: [RouterModule],
    templateUrl: './dashboard-header.component.html',
    styleUrl: './dashboard-header.component.css',
})
export class DashboardHeaderComponent {
    private authService = inject(AuthService)

    ngOnInit(): void {
        const sidebar = document.getElementById('sidebar')
        const toggle = document.getElementById('sidebarToggle')

        toggle?.addEventListener('click', () => {
            sidebar?.classList.toggle('-translate-x-full')
        })
    }

    logOut() {
        this.authService.logout()
    }
}
