export interface AreaDto {
    countryId: string
    districtId: string
    name: string
    typeName: string
    type: number
    isActive: boolean
}

export interface Area extends AreaDto {
    id: string
}
