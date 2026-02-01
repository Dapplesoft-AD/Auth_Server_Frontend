export interface SignUpRequest {
    fullName: string
    phone: string | null
    email: string | null
    password: string
}

export interface SignUpResponse {
    id: string
}
