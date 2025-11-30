export interface Application {
    id: bigint
    name: string
    client_id: string
    client_secret: string
    redirect_uri?: string
    api_base_url?: string
    status: 'active' | 'inactive'
}
