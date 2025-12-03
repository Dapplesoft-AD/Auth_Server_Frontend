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
import { PasswordReset } from '../../../../libs/passwordresets/passwordreset.model'
import { PasswordResetDataService } from '../../../../libs/passwordresets/passwordreset-data.service'

@Component({
    selector: 'app-page-passwordresets',
    standalone: true,
    imports: [
        CommonModule,
        Toast,
        FormsModule,
        ConfirmDialogModule,
        TableModule,
        ButtonModule,
        DialogModule,
        InputTextModule,
        TagModule,
    ],
    templateUrl: './page-passwordresets.component.html',
    styleUrls: ['./page-passwordresets.component.css'],
    providers: [MessageService, ConfirmationService],
})
export class PagePasswordResetsComponent implements OnInit {
    resetTokens: PasswordReset[] = []
    dialogVisible = false
    editingToken: PasswordReset = {} as PasswordReset
    isAddMode = false

    constructor(
        private passwordService: PasswordResetDataService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
    ) {}

    ngOnInit(): void {
        this.loadTokens()
    }

    loadTokens() {
        this.passwordService.getAll().subscribe((data) => {
            this.resetTokens = data
        })
    }

    openAddDialog() {
        this.editingToken = {} as PasswordReset
        this.isAddMode = true
        this.dialogVisible = true
    }

    openEditDialog(token: PasswordReset) {
        this.editingToken = { ...token }
        this.isAddMode = false
        this.dialogVisible = true
    }

    saveToken() {
        if (this.isAddMode) {
            this.passwordService.create(this.editingToken).subscribe(() => {
                this.loadTokens()
                this.dialogVisible = false

                this.messageService.add({
                    severity: 'success',
                    summary: 'Added',
                    detail: 'Password reset token added',
                })
            })
        } else {
            this.passwordService
                .update(this.editingToken.id, this.editingToken)
                .subscribe(() => {
                    this.loadTokens()
                    this.dialogVisible = false

                    this.messageService.add({
                        severity: 'success',
                        summary: 'Updated',
                        detail: 'Password reset token updated',
                    })
                })
        }
    }

    deleteToken(token: PasswordReset) {
        this.confirmationService.confirm({
            message: `Delete reset token for ${token.user_name}?`,
            accept: () => {
                this.passwordService.delete(token.id).subscribe(() => {
                    this.loadTokens()

                    this.messageService.add({
                        severity: 'success',
                        summary: 'Deleted',
                        detail: 'Password token deleted',
                    })
                })
            },
        })
    }
}
