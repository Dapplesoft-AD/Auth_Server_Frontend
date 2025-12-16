import { CommonModule } from '@angular/common'
import { Component, inject, OnInit } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { PrimeModules } from '../../../../libs/prime-modules'
import {
    CountryListStateService,
    CountryTableComponent,
} from '../../../../libs/shared-address/countries'

@Component({
    selector: 'app-page-countries',
    imports: [CommonModule, FormsModule, PrimeModules, CountryTableComponent],
    templateUrl: './page-countries.component.html',
    styleUrl: './page-countries.component.css',
    providers: [CountryListStateService],
})
export class PageCountriesComponent implements OnInit {
    private countryListState = inject(CountryListStateService)

    ngOnInit(): void {
        this.countryListState.init()
    }
}
