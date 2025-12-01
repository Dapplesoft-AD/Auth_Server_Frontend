import { Injectable, inject } from '@angular/core'
import { TokenStorageService } from './token-storage.service'

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private tokenStorage = inject(TokenStorageService)

    isLoggedIn(): boolean {
        return !!this.tokenStorage.getAccessToken()
    }

    logout(): void {
        this.tokenStorage.clear()
    }
}
