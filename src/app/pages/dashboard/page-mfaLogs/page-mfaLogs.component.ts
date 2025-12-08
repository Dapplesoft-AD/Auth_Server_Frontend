import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { ConfirmationService, MessageService } from 'primeng/api'
import { ButtonModule } from 'primeng/button'
import { ConfirmDialogModule } from 'primeng/confirmdialog'
import { DialogModule } from 'primeng/dialog'
import { InputTextModule } from 'primeng/inputtext'
import { TableModule } from 'primeng/table'
import { TagModule } from 'primeng/tag'
import { Toast } from 'primeng/toast'
import { MfaLog } from '../../../../libs/mfalogs/mfalog.model'
import { MfaLogsDataService } from '../../../../libs/mfalogs/mfalog-data.service'

@Component({
    selector: 'app-page-mfaLogs',
    standalone: true,
    imports: [
        CommonModule,
        ConfirmDialogModule,
        FormsModule,
        Toast,
        TableModule,
        DialogModule,
        ButtonModule,
        InputTextModule,
        TagModule,
    ],
    templateUrl: './page-mfaLogs.component.html',
    styleUrls: ['./page-mfaLogs.component.css'],
    providers: [MessageService, ConfirmationService],
})
export class PageMfaLogsRoutesComponent implements OnInit {
    mfaLogs: MfaLog[] = []
    dialogVisible = false
    editingLog: MfaLog = {} as MfaLog
    isAddMode = false

    constructor(
        private mfaLogsService: MfaLogsDataService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
    ) {}

    ngOnInit(): void {
        this.loadLogs()
    }

    loadLogs() {
        this.mfaLogsService.getAll().subscribe({
            next: (data) => {
                this.mfaLogs = data
            },
        })
    }

    openEditDialog(log: MfaLog) {
        this.editingLog = { ...log }
        this.isAddMode = false
        this.dialogVisible = true
    }

    saveLog() {
        if (this.isAddMode) {
            this.mfaLogsService.create(this.editingLog).subscribe(() => {
                this.loadLogs()
                this.dialogVisible = false
                this.messageService.add({
                    severity: 'success',
                    summary: 'Added',
                    detail: 'MFA log added successfully',
                })
            })
        } else {
            this.mfaLogsService
                .update(this.editingLog.id, this.editingLog)
                .subscribe(() => {
                    this.loadLogs()
                    this.dialogVisible = false
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Updated',
                        detail: 'MFA log updated successfully',
                    })
                })
        }
    }

    deleteLog(log: MfaLog) {
        this.confirmationService.confirm({
            message: `Are you sure you want to delete the log of ${log.user_name}?`,
            accept: () => {
                this.mfaLogsService.delete(log.id).subscribe(() => {
                    this.loadLogs()
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Deleted',
                        detail: 'MFA log deleted successfully',
                    })
                })
            },
        })
    }
}
