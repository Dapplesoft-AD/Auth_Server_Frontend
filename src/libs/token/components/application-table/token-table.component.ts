import { CommonModule } from '@angular/common'
import { Component, inject } from '@angular/core'
import { AlertService } from '../../../common-service/lib/alert.service'
import { PrimeModules } from '../../../prime-modules'
import { Token } from '../../token.model'
import { TokenListStateService } from '../../token-state.service'

@Component({
    selector: 'app-token-table',
    imports: [CommonModule, PrimeModules],
    templateUrl: './token-table.component.html',
    styleUrl: './token-table.component.css',
})
export class TokenTableComponent {
    protected tokenListStateService = inject(TokenListStateService)
    private alertService = inject(AlertService)

    confirmDelete(token: Token) {
        this.tokenListStateService.deleteApplication(token.id).subscribe({
            next: () => {
                this.alertService.success('Token deleted successfully')
            },
            error: () => {
                this.alertService.error('Failed to delete token')
            },
        })
    }
}
