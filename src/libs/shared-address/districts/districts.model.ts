export interface DistrictDto {
    countryId: string
    regionId: string
    name: string
    isActive: boolean
}

export interface District extends DistrictDto {
    id: string
}
