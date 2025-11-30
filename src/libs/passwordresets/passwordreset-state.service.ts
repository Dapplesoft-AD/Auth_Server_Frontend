import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { PasswordReset } from './passwordreset.model'

@Injectable({
    providedIn: 'root',
})
export class PasswordResetStateService {
    private _resets = new BehaviorSubject<PasswordReset[]>([])
    resets$ = this._resets.asObservable()

    setResets(data: PasswordReset[]) {
        this._resets.next(data)
    }

    addLocal(item: PasswordReset) {
        this._resets.next([...this._resets.value, item])
    }

    updateLocal(updated: PasswordReset) {
        const newData = this._resets.value.map((t) =>
            t.id === updated.id ? updated : t,
        )
        this._resets.next(newData)
    }

    deleteLocal(id: number) {
        this._resets.next(this._resets.value.filter((t) => t.id !== id))
    }

    getSnapshot(): PasswordReset[] {
        return this._resets.value
    }
}
