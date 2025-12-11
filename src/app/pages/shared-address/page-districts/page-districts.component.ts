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
    DistrictStateService,
    DistrictTableComponent,
} from '../../../../libs/shared-address/districts'
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
        DistrictTableComponent,
    ],
    templateUrl: './page-districts.component.html',
    styleUrl: './page-districts.component.css',
    providers: [MessageService, ConfirmationService],
})
export class PageDistrictsComponent implements OnInit {
    constructor(private districtState: DistrictStateService) {}

    ngOnInit(): void {
        this.districtState.loadDistrict()
    }
}
