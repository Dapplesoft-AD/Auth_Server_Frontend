export interface BusinessMember {
    id: number
    business_id: number
    user_id: number
    role_id: 'Admin' | 'Manager' | 'User'
    joined_at: string
}
