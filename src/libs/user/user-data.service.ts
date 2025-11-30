import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { tap } from 'rxjs/operators'
import { User } from './user.model'

@Injectable({
    providedIn: 'root',
})
export class UserDataService {
    // Dummy data locally
    private users: User[] = [
        {
            id: 1,
            name: 'Mohammad Arman',
            email: 'arman@example.com',
            role: 'Admin',
        },
        { id: 2, name: 'Hasan Ali', email: 'hasan@example.com', role: 'User' },
        { id: 3, name: 'Rahim Khan', email: 'rahim@example.com', role: 'User' },
        {
            id: 4,
            name: 'Sadia Noor',
            email: 'sadia@example.com',
            role: 'Manager',
        },
    ]

    constructor() {}

    // Get all users (dummy)
    loadUsers(): Observable<User[]> {
        return of(this.users).pipe(
            tap((data) => {
                this.users = data
            }),
        )
    }

    // Return local copy
    getLocalUsers(): User[] {
        return this.users
    }

    // Add a new user
    addUser(user: User) {
        const newId = this.users.length
            ? Math.max(...this.users.map((u) => u.id)) + 1
            : 1
        const newUser = { ...user, id: newId }
        this.users.push(newUser)
    }

    // Update an existing user
    updateUserLocal(id: number, user: User) {
        const index = this.users.findIndex((u) => u.id === id)
        if (index !== -1) this.users[index] = { ...user, id }
    }

    // Delete a user
    deleteUserLocal(id: number) {
        this.users = this.users.filter((u) => u.id !== id)
    }
}
