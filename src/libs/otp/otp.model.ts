export interface SendOtpRequest {
    input: string // Email or phone number
}

export interface SendOtpResponse {
    otpToken: string // The OTP token returned from API
}

export interface VerifyOtpRequest {
    input: string // Email or phone number
    otpToken: string // OTP code entered by user
}

export interface VerifyOtpResponse {
    isValid: boolean // Verification result
}

export interface Otp {
    identifier: string
    method: 'email' | 'phone'
    token: string
    verified: boolean
    expiresAt: Date
}

export interface OtpDto {
    input: string
    otpToken?: string
}
