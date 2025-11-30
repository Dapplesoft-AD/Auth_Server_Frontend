import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { Token } from './token.model'

@Injectable({
    providedIn: 'root',
})
export class TokenApiService {
    private baseUrl = 'https://api.example.com/tokens'

    constructor(private http: HttpClient) {}

    getAll(): Observable<Token[]> {
        return this.http.get<Token[]>(this.baseUrl)
    }

    getById(id: bigint): Observable<Token> {
        return this.http.get<Token>(`${this.baseUrl}/${id}`)
    }

    revoke(id: bigint): Observable<void> {
        return this.http.post<void>(`${this.baseUrl}/${id}/revoke`, {})
    }
}
