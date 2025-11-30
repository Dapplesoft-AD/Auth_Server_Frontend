import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { UserHistory } from './user-history.model'

@Injectable({
    providedIn: 'root',
})
export class UserHistoryApiService {
    constructor() {}

    getAll(): Observable<UserHistory[]> {
        return of([])
    }

    delete(id: number): Observable<boolean> {
        return of(true)
    }

    update(id: number, data: Partial<UserHistory>): Observable<UserHistory> {
        return of({} as UserHistory)
    }
}
