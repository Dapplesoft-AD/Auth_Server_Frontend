import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { RouterModule } from '@angular/router'
import { TableModule } from 'primeng/table'

@Component({
    selector: 'app-sidebar-dashboard',
    imports: [RouterModule, CommonModule, TableModule],
    templateUrl: './sidebar-dashboard.component.html',
    styleUrl: './sidebar-dashboard.component.css',
})
export class SidebarDashboardComponent {}
