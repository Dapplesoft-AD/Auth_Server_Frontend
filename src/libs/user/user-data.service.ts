import { Injectable, inject } from '@angular/core'
import { Observable, of } from 'rxjs'
import { tap } from 'rxjs/operators'
import { User } from './user.model'
import { UserApiService } from './user-api.service'

@Injectable({
    providedIn: 'root',
})
export class UserDataService {
    private userApiService = inject(UserApiService)
    users: User[] = []

    constructor() {}

    // load from api
    loadUsers(): Observable<User[]> {
        return this.userApiService.getUsers().pipe(
            tap((users) => {
                this.users = users // store local copy
                console.log('All users loaded')
            }),
        )
    }

    // Return local copy
    getUsers(): User[] {
        return this.users
    }

    // get a single user
    getAUser(id: string) {
        return this.users.find((u) => u.id === id) // fixed
    }

    // Add a new user
    // this option might be removed in future,
    // why add while you can register new account easily? 🤔
    // this option will cause role based complication in the back-end
    addUser(user: User): Observable<User> {
        return this.userApiService
            .createUser(user)
            .pipe(tap((u) => this.users.push(u)))
    }

    // Update an existing user
    updateUser(id: string, user: Partial<User>): Observable<User> {
        return this.userApiService.updateUser({ id, ...user })
    }

    // Delete a user
    deleteUser(id: string): Observable<void> {
        this.users = this.users.filter((u) => u.id !== id)
        return this.userApiService
            .deleteUser(id)
            .pipe(tap(() => console.log('Deleted user', id)))
    }
}
