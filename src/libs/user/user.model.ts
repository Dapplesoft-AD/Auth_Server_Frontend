export interface User {
    id: string
    email: string
    fullName: string
    phone: string
    isEmailVerified: boolean
    isMFAEnabled: boolean
    status: number
    createdAt: string
    updatedAt: string
    role?: number
}
