import { CommonModule } from '@angular/common'
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    inject,
} from '@angular/core'
import { ConfirmationService } from 'primeng/api'
import { ButtonModule } from 'primeng/button'
import { ConfirmDialogModule } from 'primeng/confirmdialog'
import { DialogService } from 'primeng/dynamicdialog'
import { IconFieldModule } from 'primeng/iconfield'
import { InputIconModule } from 'primeng/inputicon'
import { InputTextModule } from 'primeng/inputtext'
import { TableModule } from 'primeng/table'
import { AlertService } from '../../../common-service/lib/alert.service'
import { User } from '../../user.model'
import { UserStateService } from '../../user-state.service'
import { EditUserModalComponent } from '../edit-user-modal/edit-user-modal.component'

@Component({
    selector: 'app-users-table',
    imports: [
        CommonModule,
        TableModule,
        IconFieldModule,
        ButtonModule,
        InputIconModule,
        InputTextModule,
        ConfirmDialogModule,
    ],
    standalone: true,
    templateUrl: './user-table.component.html',
    styleUrl: './user-table.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserTableComponent {
    users: User[] = []
    private dialogService = inject(DialogService)
    private alertService = inject(AlertService)
    selectedUser: User = {} as User

    isLoading = false
    errorMessage: string | null = null

    constructor(
        private userState: UserStateService,
        private confirmationService: ConfirmationService,
        private cdr: ChangeDetectorRef,
    ) {}

    ngOnInit(): void {
        this.isLoading = true
        this.userState.users$.subscribe({
            next: (data) => {
                this.users = data
                this.isLoading = false
                this.cdr.markForCheck() // Manually trigger change detection
            },
            error: (error) => {
                this.isLoading = false
                this.errorMessage = 'Error loading users'
                console.error('Error:', error)
            },
        })
        this.userState.loadUsers()
    }

    openEditDialog(user: User) {
        this.dialogService.open(EditUserModalComponent, {
            header: 'Edit: ' + user.fullName,
            data: { user },
            width: '50%',
            closable: true,
            baseZIndex: 10000,
        })
    }

    deleteUser(user: User) {
        this.confirmationService.confirm({
            header: 'Delete Confirmation',
            message: `Are you sure you want to delete ${user.fullName}?`,
            accept: () => {
                this.userState.deleteUser(user).subscribe({
                    next: () => {
                        this.alertService.success(
                            `User ${user.fullName} deleted successfully`,
                        )
                    },
                    error: (err) => {
                        console.error('Delete user failed:', err)
                        this.alertService.error('Delete user failed')
                    },
                })
            },
        })
    }
}
