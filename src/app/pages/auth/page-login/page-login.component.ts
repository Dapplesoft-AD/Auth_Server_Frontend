import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { Router, RouterModule } from '@angular/router'
import { MessageService } from 'primeng/api'
import { ButtonModule } from 'primeng/button'
import { InputTextModule } from 'primeng/inputtext'
import { PasswordModule } from 'primeng/password'
import { ToastModule } from 'primeng/toast'

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        ToastModule,
        ButtonModule,
        PasswordModule,
        InputTextModule,
    ],
    providers: [MessageService, Router],
    templateUrl: './page-login.component.html',
})
export class PageLoginComponent {
    constructor(
        private messageService: MessageService,

        private router: Router,
    ) {}
    loginData = {
        emailOrPhone: '',
        password: '',
        remember: false,
    }
    passwordError = ''

    onLogin() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        const phoneRegex = /^\d{10,15}$/

        if (!this.loginData.emailOrPhone || !this.loginData.password) {
            this.messageService.add({
                severity: 'error',
                summary: 'Login Failed',
                detail: 'Please fill all fields!',
            })
            return
        }

        if (
            !emailRegex.test(this.loginData.emailOrPhone) &&
            !phoneRegex.test(this.loginData.emailOrPhone)
        ) {
            this.messageService.add({
                severity: 'error',
                summary: 'Login Failed',
                detail: 'Enter a valid email or phone number',
            })
            return
        }

        const password = this.loginData.password
        this.passwordError = ''

        if (password.length < 8) {
            this.passwordError = 'Password must be at least 8 characters'
            return
        }
        if (!/[A-Z]/.test(password)) {
            this.passwordError =
                'Password must contain at least 1 uppercase letter'
            return
        }
        if (!/[a-z]/.test(password)) {
            this.passwordError =
                'Password must contain at least 1 lowercase letter'
            return
        }
        if (!/[0-9]/.test(password)) {
            this.passwordError = 'Password must contain at least 1 number'
            return
        }
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            this.passwordError =
                'Password must contain at least 1 special character'
            return
        }

        this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Login successful!',
            life: 2000,
        })

        setTimeout(() => {
            this.router.navigate(['admin/user'])
        }, 2000)
        console.log('Login data:', this.loginData)
    }
}
