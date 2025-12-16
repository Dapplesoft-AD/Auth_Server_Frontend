import { Component, inject, OnInit } from '@angular/core'
import { PrimeModules } from '../../../../libs/prime-modules'
import {
    RegionListStateService,
    RegionTableComponent,
} from '../../../../libs/shared-address/regions'

@Component({
    selector: 'app-page-regions',
    imports: [RegionTableComponent, PrimeModules],
    templateUrl: './page-regions.component.html',
    styleUrl: './page-regions.component.css',
    providers: [RegionListStateService],
})
export class PageRegionsComponent implements OnInit {
    private regionListStateService = inject(RegionListStateService)

    ngOnInit(): void {
        this.regionListStateService.init()
    }
}
