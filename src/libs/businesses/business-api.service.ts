import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { Business } from './businesses.model'

@Injectable({
    providedIn: 'root',
})
export class BusinessApiService {
    private baseUrl = 'https://your-backend-api.com/members'

    private businesses: Business[] = [
        {
            id: 1,
            owner_user: 'Mohammad Arman',
            business_name: 'Tech Solutions Ltd',
            industry_type: 'IT Services',
            status: 'active',
            created_at: '2025-11-15',
        },
        {
            id: 2,
            owner_user: 'Jane Smith',
            business_name: 'Green Farms',
            industry_type: 'Agriculture',
            status: 'inactive',
            created_at: '2025-11-10',
        },
        {
            id: 3,
            owner_user: 'Alice Johnson',
            business_name: 'Digital Agency BD',
            industry_type: 'Marketing Agency',
            status: 'active',
            created_at: '2025-11-05',
        },
    ]

    getBusinesses(): Observable<Business[]> {
        return of(this.businesses)
    }

    createBusiness(business: Business): Observable<Business> {
        const newId = Math.max(...this.businesses.map((b) => b.id)) + 1
        business.id = newId
        business.created_at = new Date().toISOString()
        this.businesses.push(business)
        return of(business)
    }

    updateBusiness(id: number, business: Business): Observable<Business> {
        const index = this.businesses.findIndex((b) => b.id === id)
        if (index !== -1) this.businesses[index] = business
        return of(business)
    }

    deleteBusiness(id: number): Observable<void> {
        this.businesses = this.businesses.filter((b) => b.id !== id)
        return of(undefined)
    }
}
