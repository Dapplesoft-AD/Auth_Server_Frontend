import { HttpClient, HttpParams } from '@angular/common/http'
import { Inject, Injectable, inject } from '@angular/core'
import { Observable } from 'rxjs'
import { ApiService } from '../common-service/lib/api.service'
import { ENVIRONMENT, EnvironmentConfig } from '../core'
import { Token, TokenDto } from './token.model'

@Injectable({
    providedIn: 'root',
})
export class TokenApiService extends ApiService<Token, TokenDto> {
    constructor(
        @Inject(ENVIRONMENT)
        private env: EnvironmentConfig,
    ) {
        super(inject(HttpClient), `${env.apiUrl}/tokens`)
    }

    findAllTokens(query?: {
        search?: string
        page?: number
        size?: number
    }): Observable<Token[]> {
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
        return this.http.get<Token[]>(this.apiUrl, { params })
    }

    createToken(token: TokenDto): Observable<Token> {
        return this.http.post<Token>(this.apiUrl, token)
    }

    updateToken(id: string, token: TokenDto): Observable<Token> {
        return this.http.put<Token>(`${this.apiUrl}/${id}`, token)
    }

    deleteToken(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`)
    }
}
