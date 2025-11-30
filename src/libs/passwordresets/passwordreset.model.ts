export interface PasswordReset {
    id: number
    user_name: string
    token: string
    expires_at: string
    used: boolean
}
