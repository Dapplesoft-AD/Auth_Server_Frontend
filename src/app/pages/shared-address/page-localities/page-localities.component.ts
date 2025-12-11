import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { ConfirmationService, MessageService } from 'primeng/api'
import { ButtonModule } from 'primeng/button'
import { DialogModule } from 'primeng/dialog'
import { IconFieldModule } from 'primeng/iconfield'
import { InputIconModule } from 'primeng/inputicon'
import { InputTextModule } from 'primeng/inputtext'
import { PaginatorModule } from 'primeng/paginator'
import { TableModule } from 'primeng/table'
import { ToastModule } from 'primeng/toast'
import {
    LocalitieStateService,
    LocalitieTableComponent,
} from '../../../../libs/shared-address/localities'
@Component({
    selector: 'app-country',
    imports: [
        CommonModule,
        TableModule,
        PaginatorModule,
        ButtonModule,
        DialogModule,
        InputTextModule,
        FormsModule,
        ToastModule,
        IconFieldModule,
        InputIconModule,
        LocalitieTableComponent,
    ],
    templateUrl: './page-localities.component.html',
    styleUrl: './page-localities.component.css',
    providers: [MessageService, ConfirmationService],
})
export class PageLocalitiesComponent implements OnInit {
    constructor(private localitieState: LocalitieStateService) {}

    ngOnInit(): void {
        this.localitieState.loadLocalitie()
    }
}
