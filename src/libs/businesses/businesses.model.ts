export interface Business {
    id: number
    owner_user: string
    business_name: string
    industry_type: string
    logo_url?: string
    status: 'active' | 'inactive'
    created_at: string
}
