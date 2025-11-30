import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { User } from './user.model'

@Injectable({
    providedIn: 'root',
})
export class UserApiService {
    private baseUrl = 'https://your-backend-api.com/users'

    constructor(private http: HttpClient) {}

    // সব users fetch করা
    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.baseUrl)
    }

    // নতুন user create করা
    createUser(user: User): Observable<User> {
        return this.http.post<User>(this.baseUrl, user)
    }

    // existing user update করা
    updateUser(id: number, userData: Partial<User>): Observable<User> {
        return this.http.put<User>(`${this.baseUrl}/${id}`, userData)
    }

    // user delete করা
    deleteUser(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`)
    }
}
