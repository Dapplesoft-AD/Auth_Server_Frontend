// import { HttpClient } from '@angular/common/http'
// import { Injectable } from '@angular/core'
// import { Observable } from 'rxjs'
// import { environment } from '../../../environments/environment.staging'
// import { District } from './districts.model'

// @Injectable({
//     providedIn: 'root',
// })
// export class DistrictApiService {
//     private apiUrl = `${environment.apiUrl}`

//     constructor(private http: HttpClient) {}

//     getDistricts(): Observable<District[]> {
//         return this.http.get<District[]>(this.apiUrl + '/districts')
//     }
//     createDistricts(district: District): Observable<District> {
//         return this.http.post<District>(`${this.apiUrl}/districts`, district)
//     }

//     updateDistricts(id: string, data: Partial<District>): Observable<District> {
//         return this.http.put<District>(`${this.apiUrl}/districts/${id}`, data)
//     }
//     deleteDistricts(id: string): Observable<void> {
//         return this.http.delete<void>(`${this.apiUrl}/districts/${id}`)
//     }
// }

import { HttpClient, HttpParams } from '@angular/common/http'
import { Inject, Injectable, inject } from '@angular/core'
import { Observable } from 'rxjs'
import { ApiService } from '../../common-service/lib/api.service'
import { ENVIRONMENT, EnvironmentConfig } from '../../core'
import { District } from './districts.model'

@Injectable({
    providedIn: 'root',
})
export class DistrictApiService extends ApiService<District, District> {
    constructor(
        @Inject(ENVIRONMENT)
        private env: EnvironmentConfig,
    ) {
        super(inject(HttpClient), `${env.apiUrl}/districts`)
    }
    findAllDistricts(query?: {
        search?: string
        page?: number
        size?: number
    }): Observable<District[]> {
        let params = new HttpParams()
        if (query?.search) params = params.set('search', query.search)
        if (query?.page) params = params.set('page', query.page)
        if (query?.size) params = params.set('size', query.size)

        return this.http.get<District[]>(this.apiUrl, { params })
    }

    createDistrict(district: District): Observable<District> {
        return this.http.post<District>(this.apiUrl, district)
    }

    updateDistrict(id: string, district: District): Observable<District> {
        return this.http.put<District>(`${this.apiUrl}/${id}`, district)
    }

    deleteDistrict(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`)
    }
}
