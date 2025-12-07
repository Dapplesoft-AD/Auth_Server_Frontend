import { Injectable, inject } from '@angular/core'
import { WA_WINDOW } from '@ng-web-apis/common'
import { CONTEXT_USER_ID } from '../injector/auth-injector'

@Injectable({
    providedIn: 'root',
})
export class ContextUserStorageService {
    private windowRef = inject(WA_WINDOW)
    private contextUserId = inject<string>(CONTEXT_USER_ID)

    clear() {
        this.windowRef.localStorage.removeItem(this.contextUserId)
    }

    saveContextUserId(guid: string): void {
        const saved = this.getContextUserId()
        if (saved === guid) return
        this.windowRef.localStorage.removeItem(this.contextUserId)
        this.windowRef.localStorage.setItem(this.contextUserId, guid)
    }

    getContextUserId(): string | null {
        return this.windowRef.localStorage.getItem(this.contextUserId)
    }
}
