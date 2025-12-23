export interface TokenDto {
    id: string
    subject: string
    applicationId: string
    authorizationId: string
    concurrencyToken: string
    type: string
    creationDate: string
    expirationDate: string
    status: string
}
export interface Token extends TokenDto {}
