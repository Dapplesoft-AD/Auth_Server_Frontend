import { Injectable, inject } from '@angular/core'
import { Router } from '@angular/router'
import { ContextUserStorageService } from './contextUser-storage.service'
import { TokenStorageService } from './token-storage.service'

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private router = inject(Router)
    private tokenStorage = inject(TokenStorageService)
    private contextUserIdStorageService = inject(ContextUserStorageService)

    isLoggedIn(): boolean {
        return !!this.tokenStorage.getAccessToken()
    }

    logout(): void {
        this.tokenStorage.clear()
        this.contextUserIdStorageService.clear()
        this.router.navigate(['/login'])
    }
}
