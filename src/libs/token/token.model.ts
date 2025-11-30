export interface Token {
    id: bigint
    user_id: bigint
    app_id: bigint
    access_token: string
    refresh_token: string
    issued_at: string
    expires_at: string
    revoked: boolean
}
