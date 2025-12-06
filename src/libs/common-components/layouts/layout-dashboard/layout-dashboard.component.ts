import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { PublicFooterComponent } from '../../footer/public-footer/public-footer.component'
import { DashboardHeaderComponent } from '../../header/dashboard-header/dashboard-header.component'
import { SidebarDashboardComponent } from '../../sidebar/sidebar-dashboard/sidebar-dashboard.component'

@Component({
    selector: 'app-layout-dashboard',
    imports: [
        CommonModule,
        DashboardHeaderComponent,
        SidebarDashboardComponent,
        PublicFooterComponent,
    ],
    templateUrl: './layout-dashboard.component.html',
    styleUrl: './layout-dashboard.component.css',
})
export class LayoutDashboardComponent {}
