import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Inject, Injectable, inject } from '@angular/core'
import { Observable } from 'rxjs'
import { ENVIRONMENT, EnvironmentConfig } from '../core'
import { OtpType } from './otpType.enum'

@Injectable({
    providedIn: 'root',
})
export class OtpApiService {
    private http = inject(HttpClient)

    constructor(
        @Inject(ENVIRONMENT)
        private env: EnvironmentConfig,
    ) {}

    sendOtp(emailOrPhone: string, OtpType: OtpType): Observable<string> {
        return this.http.post<string>(
            `${this.env.apiUrl}/req-otp-verify`,
            {
                destination: emailOrPhone,
                OtpType: OtpType,
            },
            {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                }),
            },
        )
    }

    verifyOtp(
        destination: string,
        otpCode: string,
        otpType: OtpType,
    ): Observable<boolean> {
        return this.http.post<boolean>(
            `${this.env.apiUrl}/verify-account-otp`,
            {
                destination,
                otpCode,
                otpType,
            },
            {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                }),
            },
        )
    }
}
