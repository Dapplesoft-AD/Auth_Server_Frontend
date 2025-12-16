import { Component, inject, OnInit } from '@angular/core'
import { PrimeModules } from '../../../../libs/prime-modules'
import {
    AreaListStateService,
    AreaTableComponent,
} from '../../../../libs/shared-address/areas'

@Component({
    selector: 'app-page-areas',
    imports: [AreaTableComponent, PrimeModules],
    templateUrl: './page-areas.component.html',
    styleUrl: './page-areas.component.css',
    providers: [AreaListStateService],
})
export class PageAreasComponent implements OnInit {
    private areaListStateService = inject(AreaListStateService)

    ngOnInit(): void {
        this.areaListStateService.init()
    }
}
