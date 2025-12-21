import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Inject, Injectable, inject } from '@angular/core'
import { Observable } from 'rxjs'
import { ENVIRONMENT, EnvironmentConfig } from '../core'

@Injectable({
    providedIn: 'root',
})
export class OtpApiService {
    private http = inject(HttpClient)

    constructor(
        @Inject(ENVIRONMENT)
        private env: EnvironmentConfig,
    ) {}

    sendOtp(emailOrPhone: string): Observable<string> {
        return this.http.post<string>(
            `${this.env.apiUrl}/CommonOtp/SendOtp`,
            { input: emailOrPhone },
            {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                }),
            },
        )
    }

    verifyOtp(emailOrPhone: string, otpToken: string): Observable<boolean> {
        return this.http.post<boolean>(
            `${this.env.apiUrl}/Otp/Verify`,
            {
                input: emailOrPhone,
                otpToken: otpToken,
            },
            {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                }),
            },
        )
    }
}
