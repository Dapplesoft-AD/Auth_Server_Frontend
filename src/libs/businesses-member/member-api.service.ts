import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { BusinessMember } from './member.model'

@Injectable({
    providedIn: 'root',
})
export class MemberApiService {
    private members: BusinessMember[] = [
        {
            id: 1,
            business_id: 1,
            user_id: 1,
            role_id: 'Admin',
            joined_at: '2025-11-19',
        },
        {
            id: 2,
            business_id: 2,
            user_id: 2,
            role_id: 'Manager',
            joined_at: '2025-11-18',
        },
        {
            id: 3,
            business_id: 3,
            user_id: 3,
            role_id: 'User',
            joined_at: '2025-11-17',
        },
    ]

    getMembers(): Observable<BusinessMember[]> {
        return of(this.members)
    }

    create(member: BusinessMember): Observable<BusinessMember> {
        const newId = Math.max(...this.members.map((m) => m.id)) + 1
        member.id = newId
        member.joined_at = new Date().toISOString()
        this.members.push(member)
        return of(member)
    }

    update(id: number, member: BusinessMember): Observable<BusinessMember> {
        const index = this.members.findIndex((m) => m.id === id)
        if (index !== -1) this.members[index] = member
        return of(member)
    }

    delete(id: number): Observable<void> {
        this.members = this.members.filter((m) => m.id !== id)
        return of(undefined)
    }
}
