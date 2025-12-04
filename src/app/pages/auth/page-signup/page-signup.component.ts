import { CommonModule } from '@angular/common'
import { Component, inject } from '@angular/core'
import { FormGroup, ReactiveFormsModule } from '@angular/forms'
import { Router, RouterModule } from '@angular/router'
import { MessageService } from 'primeng/api'
import { ButtonModule } from 'primeng/button'
import { CheckboxModule } from 'primeng/checkbox'
import { FloatLabelModule } from 'primeng/floatlabel'
import { InputTextModule } from 'primeng/inputtext'
import { PasswordModule } from 'primeng/password'
import { ToastModule } from 'primeng/toast'
import { SingUpFormService } from '../../../../libs/auth'
import { LoginApiService } from '../../../../libs/auth/login/login-api.service'
import { SignupApiService } from '../../../../libs/auth/signup/signup-api.service'
import { authRoutes } from '../auth.route'

@Component({
    selector: 'app-signup',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule,
        ToastModule,
        InputTextModule,
        PasswordModule,
        CheckboxModule,
        ButtonModule,
        FloatLabelModule,
    ],
    providers: [MessageService, SingUpFormService],
    templateUrl: './page-signup.component.html',
})
export class PageSignupComponent {
    loading = false
    private router = inject(Router)
    private loginApiService = inject(LoginApiService)
    private signupApiService = inject(SignupApiService)

    constructor(
        public signUpFormService: SingUpFormService,
        private messageService: MessageService,
    ) {}

    passwordMatchValidator(group: FormGroup) {
        return group.get('password')?.value ===
            group.get('confirmPassword')?.value
            ? null
            : { mismatch: true }
    }

    onSubmit() {
        this.loading = true
        if (!this.signUpFormService.form.valid) {
            this.signUpFormService.form.markAllAsTouched()
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Form is invalid! Please check your input.',
                life: 2000,
            })
            this.loading = false
            return
        }

        const formData = this.signUpFormService.getValue()
        this.signupApiService.signup(formData).subscribe({
            next: (response) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Registration Successful',
                    detail: 'Welcome!',
                    life: 1500,
                })
                setTimeout(() => {
                    // now try to login
                    const { email, password } =
                        this.signUpFormService.getValue()
                    this.loginApiService.login({ email, password }).subscribe({
                        next: (loginResponse) => {
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Login Successful',
                                detail: 'Redirecting…',
                                life: 1500,
                            })
                            this.router.navigate([authRoutes.default.path])
                        },
                        error: (loginError) => {
                            this.messageService.add({
                                severity: 'error',
                                summary: 'Auto Login Failed',
                                detail: 'Please login manually.',
                                life: 2000,
                            })
                            this.router.navigate([authRoutes.login.path])
                        },
                    })
                }, 500) // 0.5 sec
            },

            error: (err: { error: { message: any } }) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Registration Failed',
                    detail:
                        err.error?.message ??
                        'Something went wrong please try again',
                    life: 2000,
                })
                this.loading = false
            },

            complete: () => {
                this.loading = false
            },
        })
    }
}
