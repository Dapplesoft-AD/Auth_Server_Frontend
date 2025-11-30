import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { ButtonModule } from 'primeng/button'
import { ConfirmDialogModule } from 'primeng/confirmdialog'
import { DialogModule } from 'primeng/dialog'
import { TableModule } from 'primeng/table'
import { UserHistory } from '../../../../../libs/user-history/user-history.model'
import { UserHistoryStateService } from '../../../../../libs/user-history/user-history-state.service'

@Component({
    selector: 'app-page-user-history',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ConfirmDialogModule,
        TableModule,
        DialogModule,
        ButtonModule,
    ],
    templateUrl: './page-user-history.component.html',
})
export class PageUserHistoryComponent implements OnInit {
    history: UserHistory[] = []
    editFormVisible = false
    editingItem: UserHistory = {} as UserHistory

    constructor(private state: UserHistoryStateService) {}

    ngOnInit() {
        this.state.history$.subscribe({
            next: (data) => {
                this.history = data
            },
        })
        this.state.loadHistory()
    }

    deleteHistory(id: number) {
        if (confirm('Are you sure to delete this record?')) {
            this.state.deleteHistory(id)
        }
    }

    openEditForm(item: UserHistory) {
        this.editingItem = { ...item }
        this.editFormVisible = true
    }

    updateHistory() {
        this.state.updateHistory(this.editingItem.id, this.editingItem)
        this.editFormVisible = false
    }

    cancelEdit() {
        this.editFormVisible = false
    }
}
