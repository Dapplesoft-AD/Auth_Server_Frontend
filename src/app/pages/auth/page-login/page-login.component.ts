import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { Router, RouterModule } from '@angular/router'
import { MessageService } from 'primeng/api'
import { ButtonModule } from 'primeng/button'
import { FloatLabelModule } from 'primeng/floatlabel'
import { InputTextModule } from 'primeng/inputtext'
import { PasswordModule } from 'primeng/password'
import { ProgressSpinnerModule } from 'primeng/progressspinner'
import { ToastModule } from 'primeng/toast'
import { LoginFormService, TokenStorageService } from '../../../../libs/auth'
import { LoginApiService } from '../../../../libs/auth/login/login-api.service'
import { dashboardRoutes } from '../../dashboard/dashboard.route'

@Component({
    selector: 'app-login',
    imports: [
        ReactiveFormsModule,
        RouterModule,
        CommonModule,
        ToastModule,
        ButtonModule,
        PasswordModule,
        ProgressSpinnerModule,
        InputTextModule,
        FloatLabelModule,
    ],
    providers: [LoginFormService, MessageService],
    templateUrl: './page-login.component.html',
})
export class PageLoginComponent {
    showPassword = false
    loading = false

    constructor(
        public loginFormService: LoginFormService,
        private router: Router,
        private messageService: MessageService,
        private loginApiService: LoginApiService,
    ) {}

    togglePassword() {
        this.showPassword = !this.showPassword
    }

    onSubmit() {
        this.loading = true
        if (!this.loginFormService.form.valid) {
            this.loginFormService.form.markAllAsTouched()
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Form is invalid! Please check your input.',
                life: 2000,
            })
            this.loading = false
            return
        }

        const formData = this.loginFormService.getValue()
        this.loginApiService.login(formData).subscribe({
            next: (response) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Login Successful',
                    detail: 'Welcome back!',
                    life: 1500,
                })
                // navigation happens ONLY when login API succeeded
                setTimeout(() => {
                    this.router.navigate([dashboardRoutes.user.path])
                }, 500) // 0.5 sec
            },

            error: (err: { error: { message: any } }) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Login Failed',
                    detail: err.error?.message ?? 'Invalid email or password.',
                    life: 2000,
                })
                this.loading = false
            },

            complete: () => {
                this.loading = false
            },
        })
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
