import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { UserHistory } from './user-history.model'

@Injectable({
    providedIn: 'root',
})
export class UserHistoryDataService {
    private history: UserHistory[] = [
        {
            id: 1,
            user_id: 101,
            user_name: 'Mohammad Arman',
            ip_address: '192.168.1.1',
            country: 'Bangladesh',
            city: 'Dhaka',
            browser: 'Chrome',
            os: 'Windows 10',
            device: 'desktop',
            login_time: '2025-11-21 10:00',
            logout_time: '2025-11-21 12:00',
            status: 'success',
        },
        {
            id: 2,
            user_id: 102,
            user_name: 'Hasan Ali',
            ip_address: '192.168.1.2',
            country: 'Bangladesh',
            city: 'Chittagong',
            browser: 'Firefox',
            os: 'Ubuntu',
            device: 'desktop',
            login_time: '2025-11-21 11:00',
            logout_time: '2025-11-21 11:30',
            status: 'failed',
        },
        {
            id: 3,
            user_id: 103,
            user_name: 'Rahim Khan',
            ip_address: '192.168.1.3',
            country: 'Bangladesh',
            city: 'Sylhet',
            browser: 'Edge',
            os: 'Windows 11',
            device: 'desktop',
            login_time: '2025-11-21 09:45',
            logout_time: '2025-11-21 10:30',
            status: 'success',
        },
    ]

    constructor() {}

    getAll(): Observable<UserHistory[]> {
        return of(this.history)
    }

    delete(id: number): Observable<boolean> {
        this.history = this.history.filter((h) => h.id !== id)
        return of(true)
    }

    update(id: number, data: Partial<UserHistory>): Observable<UserHistory> {
        const index = this.history.findIndex((h) => h.id === id)
        if (index >= 0) {
            this.history[index] = { ...this.history[index], ...data }
        }
        return of(this.history[index])
    }
}
