import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { User } from './user.model'
import { UserDataService } from './user-data.service'

@Injectable({
    providedIn: 'root',
})
export class UserStateService {
    private usersSubject = new BehaviorSubject<User[]>([])
    users$ = this.usersSubject.asObservable()

    constructor(private dataService: UserDataService) {}

    loadUsers() {
        this.dataService.loadUsers().subscribe((data) => {
            this.usersSubject.next(data)
        })
    }

    addUser(user: User) {
        this.dataService.addUser(user)
        this.usersSubject.next(this.dataService.getLocalUsers())
    }

    updateUser(id: number, user: User) {
        this.dataService.updateUserLocal(id, user)
        this.usersSubject.next(this.dataService.getLocalUsers())
    }

    deleteUser(id: number) {
        this.dataService.deleteUserLocal(id)
        this.usersSubject.next(this.dataService.getLocalUsers())
    }
}
