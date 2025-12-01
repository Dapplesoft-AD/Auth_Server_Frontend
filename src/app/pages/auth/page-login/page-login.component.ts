import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { Router, RouterModule } from '@angular/router'
import { MessageService } from 'primeng/api'
import { ButtonModule } from 'primeng/button'
import { ToastModule } from 'primeng/toast'
import { LoginFormService, TokenStorageService } from '../../../../libs/auth'
import { LoginApiService } from '../../../../libs/auth/login/login-api.service'

@Component({
    selector: 'app-login',
    imports: [
        ReactiveFormsModule,
        RouterModule,
        CommonModule,
        ToastModule,
        ButtonModule,
    ],
    providers: [LoginFormService, MessageService],
    templateUrl: './page-login.component.html',
})
export class PageLoginComponent {
    showPassword = false

    constructor(
        public loginFormService: LoginFormService,
        private router: Router,
        private messageService: MessageService,
        private loginApiService: LoginApiService,
        private tokenStorage: TokenStorageService,
    ) {}

    togglePassword() {
        this.showPassword = !this.showPassword
    }

    onSubmit() {
        if (this.loginFormService.form.valid) {
            const formData = this.loginFormService.getValue()
            console.log('Login Data:', formData)

            this.loginApiService.login(formData).subscribe({
                next: (response) => {
                    // ⭐ Save tokens in localStorage
                    if (typeof response === 'string') {
                        // raw token
                        this.tokenStorage.saveAccessToken(response)
                    } else {
                        this.tokenStorage.saveAccessToken(response.token)
                        // this.tokenStorage.saveRefreshToken(response.refreshToken);
                    }
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Login Successful',
                        detail: 'Welcome back!',
                        life: 1500,
                    })
                    // navigation happens ONLY when login API succeeded
                    setTimeout(() => {
                        this.router.navigate(['/admin/user'])
                    }, 1500) // 1.5 sec
                },

                error: (err: { error: { message: any } }) => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Login Failed',
                        detail:
                            err.error?.message ?? 'Invalid email or password.',
                        life: 2000,
                    })
                },
            })
        } else {
            this.loginFormService.form.markAllAsTouched()
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Form is invalid! Please check your input.',
                life: 2000,
            })
        }
    }

    googleLogin() {
        this.messageService.add({
            severity: 'info',
            summary: 'Google Login',
            detail: 'Redirecting to Google...',
            life: 1200,
        })
    }

    githubLogin() {
        this.messageService.add({
            severity: 'info',
            summary: 'GitHub Login',
            detail: 'Redirecting to GitHub...',
            life: 1200,
        })
    }

    microsoftLogin() {
        this.messageService.add({
            severity: 'info',
            summary: 'Microsoft Login',
            detail: 'Redirecting to Microsoft...',
            life: 1200,
        })
    }
}
