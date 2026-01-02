import { Component, inject, OnInit } from '@angular/core'
import { ConfirmationService } from 'primeng/api'
import {
    ApplicationListStateService,
    ApplicationTableComponent,
} from '../../../../libs/applications'
import { PrimeModules } from '../../../../libs/prime-modules'

@Component({
    selector: 'app-page-applications',
    imports: [ApplicationTableComponent, PrimeModules],
    templateUrl: './page-applications.component.html',
    styleUrl: './page-applications.component.css',
    providers: [ApplicationListStateService, ConfirmationService],
})
export class PageApplicationsComponent implements OnInit {
    private applicationListStateService = inject(ApplicationListStateService)

    ngOnInit(): void {
        this.applicationListStateService.init()
    }
}
