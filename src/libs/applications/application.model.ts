export interface ApplicationDto {
    clientId: string
    clientSecret: string
    displayName: string
    redirectUris: string[]
}

export interface Application extends ApplicationDto {
    grantTypes: string
    clientType: string
}
