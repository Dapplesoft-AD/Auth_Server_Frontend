import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { MessageService } from 'primeng/api'
import { ButtonModule } from 'primeng/button'
import { TableModule } from 'primeng/table'
import { ToastModule } from 'primeng/toast'
import { EmailVerification } from '../../../../../libs/emailverifications/emailVerification.model'
import { EmailVerificationStateService } from '../../../../../libs/emailverifications/emailVerification-state.service'

@Component({
    selector: 'app-page-email-verifications',
    standalone: true,
    imports: [CommonModule, TableModule, ButtonModule, ToastModule],
    templateUrl: './page-emailVerifications.component.html',
    styleUrls: ['./page-emailVerifications.component.css'],
    providers: [MessageService],
})
export class PageEmailVerificationsComponent implements OnInit {
    tokens: EmailVerification[] = []

    constructor(
        private stateService: EmailVerificationStateService,
        private messageService: MessageService,
    ) {}

    ngOnInit(): void {
        this.stateService.verifications$.subscribe((data) => {
            this.tokens = data
        })

        this.stateService.loadVerifications()
    }

    verify(id: bigint) {
        this.stateService.verifyToken(id)

        this.messageService.add({
            severity: 'success',
            summary: 'Verified',
            detail: 'Email verification token successfully verified!',
        })
    }
}
