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
    AreaStateService,
    AreaTableComponent,
} from '../../../../libs/shared-address/areas'
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
        AreaTableComponent,
    ],
    templateUrl: './page-areas.component.html',
    styleUrl: './page-areas.component.css',
    providers: [MessageService, ConfirmationService],
})
export class PageAreasComponent implements OnInit {
    constructor(private areaState: AreaStateService) {}

    ngOnInit(): void {
        this.areaState.loadArea()
    }
}
