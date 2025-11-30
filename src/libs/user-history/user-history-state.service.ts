import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { UserHistory } from './user-history.model'
import { UserHistoryDataService } from './user-history-data.service'

@Injectable({
    providedIn: 'root',
})
export class UserHistoryStateService {
    private historySubject = new BehaviorSubject<UserHistory[]>([])
    history$ = this.historySubject.asObservable()

    constructor(private dataService: UserHistoryDataService) {}

    loadHistory() {
        this.dataService.getAll().subscribe((data) => {
            this.historySubject.next(data)
        })
    }

    deleteHistory(id: number) {
        this.dataService.delete(id).subscribe(() => {
            const updated = this.historySubject.value.filter((h) => h.id !== id)
            this.historySubject.next(updated)
        })
    }

    updateHistory(id: number, payload: Partial<UserHistory>) {
        this.dataService.update(id, payload).subscribe((updatedItem) => {
            const updatedList = this.historySubject.value.map((h) =>
                h.id === id ? updatedItem : h,
            )
            this.historySubject.next(updatedList)
        })
    }
}
