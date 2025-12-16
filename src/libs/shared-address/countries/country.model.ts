export interface CountryDto {
    name: string
    capital: string
    phoneCode: string
    isActive: boolean
}

export interface Country extends CountryDto {
    id: string
}
