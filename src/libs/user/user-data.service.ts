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
        return this.users
    }

    // Add a new user
    addUser(user: User) {
        // this option might be removed in future,
        // why add while you can register new account easily? 🤔
        // this option will cause role based complication in the back-end
    }

    // Update an existing user
    updateUser(id: string, user: User) {}

    // Delete a user
    deleteUser(id: string) {
        // Remove from local array
        this.users = this.users.filter((u) => u.id !== id)

        // Call API Delete
        return this.userApiService
            .deleteUser(id)
            .pipe(tap(() => console.log('Deleted user', id)))
    }
}
