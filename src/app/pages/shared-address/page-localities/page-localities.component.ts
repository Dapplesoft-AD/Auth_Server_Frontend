import { CommonModule } from '@angular/common'
import { Component, inject, OnInit } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { PrimeModules } from '../../../../libs/prime-modules'
import {
    LocalitieListStateService,
    LocalitieTableComponent,
} from '../../../../libs/shared-address/localities'

@Component({
    selector: 'app-page-localities',
    imports: [CommonModule, FormsModule, PrimeModules, LocalitieTableComponent],
    templateUrl: './page-localities.component.html',
    styleUrl: './page-localities.component.css',
    providers: [LocalitieListStateService],
})
export class PageLocalitiesComponent implements OnInit {
    private localitieListState = inject(LocalitieListStateService)

    ngOnInit(): void {
        this.localitieListState.init()
    }
}
