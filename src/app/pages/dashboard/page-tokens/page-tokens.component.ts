import { Component, inject, OnInit } from '@angular/core'
import { TokenListStateService } from '../../../../libs/token'
import { TokenTableComponent } from '../../../../libs/token/components/application-table/token-table.component'

@Component({
    selector: 'app-page-tokens',
    standalone: true,
    imports: [TokenTableComponent],
    templateUrl: './page-tokens.component.html',
    styleUrls: ['./page-tokens.component.css'],
    providers: [TokenListStateService],
})
export class PageTokensComponent implements OnInit {
    private tokenListStateService = inject(TokenListStateService)

    ngOnInit(): void {
        this.tokenListStateService.init()
    }
}
