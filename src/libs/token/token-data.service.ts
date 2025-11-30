import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { Token } from './token.model'

@Injectable({
    providedIn: 'root',
})
export class TokenDataService {
    private tokens: Token[] = [
        {
            id: 1n,
            user_id: 1n,
            app_id: 1n,
            access_token: 'abc123access',
            refresh_token: 'abc123refresh',
            issued_at: '2025-11-21T10:00:00Z',
            expires_at: '2025-12-21T10:00:00Z',
            revoked: false,
        },
        {
            id: 2n,
            user_id: 2n,
            app_id: 2n,
            access_token: 'def456access',
            refresh_token: 'def456refresh',
            issued_at: '2025-11-20T10:00:00Z',
            expires_at: '2025-12-20T10:00:00Z',
            revoked: true,
        },
    ]

    constructor() {}

    getAll(): Observable<Token[]> {
        return of(this.tokens)
    }

    revoke(id: bigint): boolean {
        const token = this.tokens.find((t) => t.id === id)
        if (token) {
            token.revoked = true
            return true
        }
        return false
    }
}
