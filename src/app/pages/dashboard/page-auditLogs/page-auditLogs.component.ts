import { CommonModule } from '@angular/common'
import { Component, inject, OnInit } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { ConfirmationService, MessageService } from 'primeng/api'
import { ButtonModule } from 'primeng/button'
import { DialogModule } from 'primeng/dialog'
import { IconFieldModule } from 'primeng/iconfield'
import { InputIconModule } from 'primeng/inputicon'
import { InputTextModule } from 'primeng/inputtext'
import { PaginatorModule } from 'primeng/paginator'
import { TableModule } from 'primeng/table'
import { ToastModule } from 'primeng/toast'
import { AuditLogListStateService } from '../../../../libs/auditlogs/auditlog-state.service'
import { AuditLogTableComponent } from '../../../../libs/auditlogs/components/auditlog-table/auditlog-table.component'

@Component({
    selector: 'app-page-auditLogs',
    standalone: true,
    imports: [
        CommonModule,
        TableModule,
        PaginatorModule,
        ButtonModule,
        ToastModule,
        DialogModule,
        InputTextModule,
        FormsModule,
        IconFieldModule,
        InputIconModule,
        AuditLogTableComponent,
    ],
    templateUrl: './page-auditLogs.component.html',
    providers: [MessageService, ConfirmationService, AuditLogListStateService],
})
export class PageAuditLogsComponent implements OnInit {
    auditStateService = inject(AuditLogListStateService)

    ngOnInit(): void {
        this.auditStateService.init()
    }
}
