import { HttpClient } from '@angular/common/http'
import { Inject, Injectable, inject } from '@angular/core'
import { Observable } from 'rxjs'
import { ENVIRONMENT, EnvironmentConfig } from '../core'
import {
    ForgotPassword,
    ForgotPasswordRequestDto,
} from './forgot-password.model'

@Injectable({
    providedIn: 'root',
})
export class ForgotPasswordApiService {
    private http = inject(HttpClient)

    constructor(
        @Inject(ENVIRONMENT)
        private env: EnvironmentConfig,
    ) {}

    // Send OTP for password reset
    sendOtp(email: string): Observable<any> {
        return this.http.post<any>(
            `${this.env.apiUrl}/CommonOtp/SendOtp`,
            { input: email },
            { headers: { 'Content-Type': 'application/json' } },
        )
    }

    // Verify OTP for password reset
    verifyOtp(email: string, otpToken: string): Observable<any> {
        return this.http.post<any>(
            `${this.env.apiUrl}/Otp/Verify`,
            {
                input: email,
                otpToken: otpToken,
            },
            { headers: { 'Content-Type': 'application/json' } },
        )
    }

    // Reset password after OTP verification
    resetPassword(
        request: ForgotPasswordRequestDto,
    ): Observable<ForgotPassword> {
        return this.http.post<ForgotPassword>(
            `${this.env.apiUrl}/users/forgot-password-reset`,
            request,
            { headers: { 'Content-Type': 'application/json' } },
        )
    }
}
