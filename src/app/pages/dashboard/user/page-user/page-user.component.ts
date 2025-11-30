import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { ConfirmationService, MessageService } from 'primeng/api'
import { ButtonModule } from 'primeng/button'
import { DialogModule } from 'primeng/dialog'
import { InputTextModule } from 'primeng/inputtext'
import { PaginatorModule } from 'primeng/paginator'
import { TableModule } from 'primeng/table'
import { ToastModule } from 'primeng/toast'
import { User } from '../../../../../libs/user/user.model'
import { UserStateService } from '../../../../../libs/user/user-state.service'

@Component({
    selector: 'app-page-user',
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
    ],
    templateUrl: './page-user.component.html',
    styleUrls: ['./page-user.component.css'],
    providers: [MessageService, ConfirmationService],
})
export class PageUserComponent implements OnInit {
    users: User[] = []
    selectedUser: User = {} as User
    displayDialog = false
    isEdit = false

    constructor(
        private userState: UserStateService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
    ) {}

    ngOnInit(): void {
        this.userState.users$.subscribe({
            next: (users) => {
                this.users = users
            },
        })
        this.userState.loadUsers()
    }

    openAddDialog() {
        this.selectedUser = {} as User
        this.isEdit = false
        this.displayDialog = true
    }

    openEditDialog(user: User) {
        this.selectedUser = { ...user }
        this.isEdit = true
        this.displayDialog = true
    }

    saveUser() {
        if (this.isEdit) {
            this.userState.updateUser(this.selectedUser.id, this.selectedUser)
            this.messageService.add({
                severity: 'success',
                summary: 'Updated',
                detail: 'User updated successfully',
            })
        } else {
            this.userState.addUser(this.selectedUser)
            this.messageService.add({
                severity: 'success',
                summary: 'Added',
                detail: 'User added successfully',
            })
        }
        this.displayDialog = false
    }

    deleteUser(user: User) {
        this.confirmationService.confirm({
            message: `Are you sure you want to delete ${user.name}?`,
            accept: () => {
                this.userState.deleteUser(user.id)
                this.messageService.add({
                    severity: 'success',
                    summary: 'Deleted',
                    detail: 'User deleted successfully',
                })
            },
        })
    }

    cancelDialog() {
        this.displayDialog = false
    }
}
