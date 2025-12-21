import { Injectable, inject } from '@angular/core'
import { catchError, finalize, tap, throwError } from 'rxjs'
import { SimpleStore } from '../store'
import { OtpApiService } from './otp-api.service'

export type OtpState = {
    identifier: string
    method: 'email' | 'phone'
    otpToken: string
    loading: boolean
    error: boolean
    errorMessage: string | null
    verificationStatus: 'idle' | 'sent' | 'verified' | 'failed' | 'expired'
    otpCode: string
    expiresAt: number | null // timestamp when OTP expires
    timeRemaining: number // seconds remaining
}

const initialOtpState: OtpState = {
    identifier: '',
    method: 'email',
    otpToken: '',
    loading: false,
    error: false,
    errorMessage: null,
    verificationStatus: 'idle',
    otpCode: '',
    expiresAt: null,
    timeRemaining: 0,
}

@Injectable({
    providedIn: 'root',
})
export class OtpStateService extends SimpleStore<OtpState> {
    public otpApiService = inject(OtpApiService)
    public countdownInterval: any = null
    public readonly OTP_DURATION = 2 * 60 * 1000 // 2 minutes in milliseconds
    public readonly OTP_DURATION_SECONDS = 120 // 2 minutes in seconds
    state$: any

    constructor() {
        super(initialOtpState)
    }

    // Set identifier and determine method (email/phone)
    setIdentifier(identifier: string) {
        const method = identifier.includes('@') ? 'email' : 'phone'
        this.setState({
            identifier,
            method,
            error: false,
            errorMessage: null,
        })
    }

    // Set OTP code from user input
    setOtpCode(otpCode: string) {
        this.setState({ otpCode })
    }

    // Send OTP to the provided identifier
    sendOtp() {
        const { identifier } = this.getState()

        if (!identifier) {
            this.setState({
                error: true,
                errorMessage: 'Identifier is required',
            })
            return throwError(() => new Error('Identifier is required'))
        }

        this.setState({
            loading: true,
            error: false,
            errorMessage: null,
            verificationStatus: 'idle',
        })

        return this.otpApiService.sendOtp(identifier).pipe(
            tap((response) => {
                const expiresAt = Date.now() + this.OTP_DURATION

                this.setState({
                    loading: false,
                    otpToken: response,
                    verificationStatus: 'sent',
                    expiresAt: expiresAt,
                    timeRemaining: this.OTP_DURATION_SECONDS,
                })

                // Start the countdown timer
                this.startCountdown()
            }),
            catchError((error) => {
                this.setState({
                    loading: false,
                    error: true,
                    errorMessage: error.message || 'Failed to send OTP',
                    verificationStatus: 'failed',
                    expiresAt: null,
                    timeRemaining: 0,
                })
                return throwError(() => error)
            }),
            finalize(() => {
                this.setState({ loading: false })
            }),
        )
    }

    // Verify the entered OTP code
    verifyOtp() {
        const { identifier, otpCode, verificationStatus, timeRemaining } =
            this.getState()

        // Check if OTP is expired
        if (verificationStatus === 'expired' || timeRemaining <= 0) {
            this.setState({
                error: true,
                errorMessage: 'OTP has expired. Please request a new one.',
            })
            return throwError(() => new Error('OTP has expired'))
        }

        if (!identifier || !otpCode) {
            this.setState({
                error: true,
                errorMessage: 'Identifier and OTP code are required',
            })
            return throwError(
                () => new Error('Identifier and OTP code are required'),
            )
        }

        this.setState({
            loading: true,
            error: false,
            errorMessage: null,
        })

        return this.otpApiService.verifyOtp(identifier, otpCode).pipe(
            tap((isValid) => {
                this.stopCountdown() // Stop timer after verification attempt

                if (isValid) {
                    this.setState({
                        loading: false,
                        verificationStatus: 'verified',
                        error: false,
                        errorMessage: null,
                        expiresAt: null,
                        timeRemaining: 0,
                    })
                } else {
                    this.setState({
                        loading: false,
                        verificationStatus: 'failed',
                        error: true,
                        errorMessage: 'Invalid OTP code',
                    })
                }
            }),
            catchError((error) => {
                this.stopCountdown() // Stop timer on error
                this.setState({
                    loading: false,
                    error: true,
                    errorMessage: error.message || 'Failed to verify OTP',
                    verificationStatus: 'failed',
                })
                return throwError(() => error)
            }),
            finalize(() => {
                this.setState({ loading: false })
            }),
        )
    }

    // Start countdown timer
    private startCountdown() {
        this.stopCountdown() // Clear any existing interval

        this.countdownInterval = setInterval(() => {
            const { expiresAt, verificationStatus } = this.getState()

            if (!expiresAt || verificationStatus !== 'sent') {
                this.stopCountdown()
                return
            }

            const now = Date.now()
            const remainingMs = expiresAt - now
            const remainingSeconds = Math.max(0, Math.floor(remainingMs / 1000))

            if (remainingSeconds <= 0) {
                // OTP has expired
                this.setState({
                    timeRemaining: 0,
                    verificationStatus: 'expired',
                    error: true,
                    errorMessage: 'OTP has expired. Please request a new code.',
                })
                this.stopCountdown()
            } else {
                this.setState({
                    timeRemaining: remainingSeconds,
                })
            }
        }, 1000) // Update every second
    }

    // Stop countdown timer
    private stopCountdown() {
        if (this.countdownInterval) {
            clearInterval(this.countdownInterval)
            this.countdownInterval = null
        }
    }

    // Get formatted time (MM:SS)
    getFormattedTime(): string {
        const { timeRemaining } = this.getState()
        const minutes = Math.floor(timeRemaining / 60)
        const seconds = timeRemaining % 60
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    }

    // Check if OTP is still valid
    isOtpValid(): boolean {
        const { verificationStatus, timeRemaining } = this.getState()
        return verificationStatus === 'sent' && timeRemaining > 0
    }

    // Resend OTP
    resendOtp() {
        this.clearOtpState()
        return this.sendOtp()
    }

    // Clear OTP state (useful for resetting)
    clearOtpState() {
        this.stopCountdown()
        this.setState({
            otpCode: '',
            otpToken: '',
            verificationStatus: 'idle',
            error: false,
            errorMessage: null,
            expiresAt: null,
            timeRemaining: 0,
        })
    }

    // Reset entire state
    override reset() {
        this.stopCountdown()
        this.setState(initialOtpState)
    }
}
