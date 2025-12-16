// import { HttpClient } from '@angular/common/http'
// import { Injectable } from '@angular/core'
// import { Observable } from 'rxjs'
// import { environment } from '../../../environments/environment.staging'
// import { Region } from './regions.model'

// @Injectable({
//     providedIn: 'root',
// })
// export class RegionApiService {
//     private apiUrl = `${environment.apiUrl}`

//     constructor(private http: HttpClient) {}

//     getRegions(): Observable<Region[]> {
//         return this.http.get<Region[]>(this.apiUrl + '/regions')
//     }
//     createRegions(region: Region): Observable<Region> {
//         return this.http.post<Region>(`${this.apiUrl}/regions`, region)
//     }

//     updateRegions(id: string, data: Partial<Region>): Observable<Region> {
//         return this.http.put<Region>(`${this.apiUrl}/regions/${id}`, data)
//     }
//     deleteRegions(id: string): Observable<void> {
//         return this.http.delete<void>(`${this.apiUrl}/regions/${id}`)
//     }
// }

import { HttpClient, HttpParams } from '@angular/common/http'
import { Inject, Injectable, inject } from '@angular/core'
import { Observable } from 'rxjs'
import { ApiService } from '../../common-service/lib/api.service'
import { ENVIRONMENT, EnvironmentConfig } from '../../core'
import { Region, RegionDto } from './regions.model'

@Injectable({
    providedIn: 'root',
})
export class RegionApiService extends ApiService<Region, RegionDto> {
    constructor(
        @Inject(ENVIRONMENT)
        private env: EnvironmentConfig,
    ) {
        super(inject(HttpClient), `${env.apiUrl}/regions`)
    }

    findAllRegions(query?: {
        search?: string
        page?: number
        size?: number
    }): Observable<Region[]> {
        let params = new HttpParams()

        if (query?.search) {
            params = params.set('search', query.search)
        }
        if (query?.page) {
            params = params.set('page', query.page)
        }
        if (query?.size) {
            params = params.set('size', query.size)
        }

        return this.http.get<Region[]>(this.apiUrl, { params })
    }

    createRegion(region: RegionDto): Observable<Region> {
        return this.http.post<Region>(this.apiUrl, region)
    }

    updateRegion(id: string, region: RegionDto): Observable<Region> {
        return this.http.put<Region>(`${this.apiUrl}/${id}`, region)
    }

    deleteRegion(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`)
    }
}
