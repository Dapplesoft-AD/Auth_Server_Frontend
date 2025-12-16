export interface LocalitieDto {
    countryId: string
    areaId: string
    name: string
    type: number
    typeName: string
    isActive: boolean
}

export interface Localitie extends LocalitieDto {
    id: string
}
