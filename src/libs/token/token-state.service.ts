import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { Token } from './token.model'
import { TokenDataService } from './token-data.service'

@Injectable({
    providedIn: 'root',
})
export class TokenStateService {
    private tokensSubject = new BehaviorSubject<Token[]>([])
    tokens$ = this.tokensSubject.asObservable()

    constructor(private dataService: TokenDataService) {}

    loadTokens() {
        this.dataService
            .getAll()
            .subscribe((data) => this.tokensSubject.next(data))
    }

    revokeToken(id: bigint) {
        if (this.dataService.revoke(id)) {
            this.loadTokens()
        }
    }
}
