import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { ButtonModule } from 'primeng/button'
import { TableModule } from 'primeng/table'
import { Token } from '../../../../../libs/token/token.model'
import { TokenStateService } from '../../../../../libs/token/token-state.service'

@Component({
    selector: 'app-page-tokens',
    standalone: true,
    imports: [
        CommonModule,

        TableModule,
        ButtonModule,
    ],
    templateUrl: './page-tokens.component.html',
    styleUrls: ['./page-tokens.component.css'],
})
export class PageTokensComponent implements OnInit {
    tokens: Token[] = []

    constructor(private tokenState: TokenStateService) {}

    ngOnInit(): void {
        this.loadTokens()
        this.tokenState.loadTokens()
    }

    loadTokens() {
        this.tokenState.tokens$.subscribe({
            next: (data) => {
                this.tokens = data
            },
        })
    }

    revokeToken(id: bigint): void {
        this.tokenState.revokeToken(id)
    }
}
