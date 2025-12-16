import { CommonModule } from '@angular/common'
import { Component, inject, OnInit } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { PrimeModules } from '../../../../libs/prime-modules'
import {
    DistrictListStateService,
    DistrictTableComponent,
} from '../../../../libs/shared-address/districts'

@Component({
    selector: 'app-page-districts',
    imports: [CommonModule, FormsModule, PrimeModules, DistrictTableComponent],
    templateUrl: './page-districts.component.html',
    styleUrl: './page-districts.component.css',
    providers: [DistrictListStateService],
})
export class PageDistrictsComponent implements OnInit {
    private districtListState = inject(DistrictListStateService)

    ngOnInit(): void {
        this.districtListState.init()
    }
}
