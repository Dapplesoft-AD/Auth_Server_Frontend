// smtp-config.model.ts
export interface SmtpConfigDto {
    host: string
    port: number
    username: string
    password: string
    senderEmail: string
    enableSsl: boolean // Add this if missing
}

export interface SmtpConfig extends SmtpConfigDto {
    smtpId: string // Changed from 'id' to 'smtpId'
}
