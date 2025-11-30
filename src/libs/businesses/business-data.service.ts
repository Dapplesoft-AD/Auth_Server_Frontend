import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
import { BusinessApiService } from './business-api.service'
import { Business } from './businesses.model'

@Injectable({
    providedIn: 'root',
})
export class BusinessDataService {
    private businesses: Business[] = []

    constructor(private api: BusinessApiService) {}

    loadBusinesses(): Observable<Business[]> {
        return this.api.getBusinesses().pipe(
            tap((data) => {
                this.businesses = data
            }),
        )
    }

    getLocalBusinesses(): Business[] {
        return this.businesses
    }

    addBusiness(business: Business) {
        this.businesses.push(business)
    }

    updateBusinessLocal(id: number, business: Business) {
        const index = this.businesses.findIndex((b) => b.id === id)
        if (index !== -1) this.businesses[index] = business
    }

    deleteBusinessLocal(id: number) {
        this.businesses = this.businesses.filter((b) => b.id !== id)
    }
}
