export interface UserHistory {
    id: number
    user_id: number
    user_name?: string
    ip_address: string
    country: string
    city: string
    browser: string
    os: string
    device: string
    login_time: string
    logout_time?: string | null
    status: 'success' | 'failed'
}
