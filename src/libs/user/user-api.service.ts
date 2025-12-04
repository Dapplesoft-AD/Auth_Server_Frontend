import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from '../../environments/environment.prod'
import { User } from './user.model'

@Injectable({
    providedIn: 'root',
})
export class UserApiService {
    private apiUrl = `${environment.apiUrl}`

    constructor(private http: HttpClient) {}

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.apiUrl + '/users/get-all')
    }

    // createUser(user: User): Observable<User> {
    //     return this.http.post<User>(this.apiUrl, user)
    // }

    updateUser(id: string, userData: Partial<User>): Observable<User> {
        return this.http.put<User>(`${this.apiUrl}/${id}`, userData)
    }

    deleteUser(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`)
    }
}
