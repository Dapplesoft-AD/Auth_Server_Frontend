import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { PasswordReset } from './passwordreset.model'

@Injectable({
    providedIn: 'root',
})
export class PasswordResetDataService {
    private passwordResets: PasswordReset[] = [
        {
            id: 1,
            user_name: 'Arman',
            token: 'abc123token',
            expires_at: '2025-12-01T12:00:00Z',
            used: false,
        },
        {
            id: 2,
            user_name: 'Hasan',
            token: 'def456token',
            expires_at: '2025-12-05T12:00:00Z',
            used: true,
        },
        {
            id: 3,
            user_name: 'Rahim',
            token: 'ghi789token',
            expires_at: '2025-12-10T12:00:00Z',
            used: false,
        },
    ]

    getAll(): Observable<PasswordReset[]> {
        return of(this.passwordResets)
    }

    create(data: PasswordReset): Observable<PasswordReset> {
        const newId = this.passwordResets.length
            ? Math.max(...this.passwordResets.map((r) => r.id)) + 1
            : 1
        const newReset = { ...data, id: newId }
        this.passwordResets.push(newReset)
        return of(newReset)
    }

    update(id: number, data: PasswordReset): Observable<PasswordReset> {
        const index = this.passwordResets.findIndex((r) => r.id === id)
        if (index !== -1) this.passwordResets[index] = data
        return of(data)
    }

    delete(id: number): Observable<void> {
        this.passwordResets = this.passwordResets.filter((r) => r.id !== id)
        return of(undefined)
    }
}
