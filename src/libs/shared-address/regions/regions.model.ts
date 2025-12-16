export interface RegionDto {
    countryId: string
    name: string
    regionType: string
    isActive: boolean
}
export interface Region extends RegionDto {
    id: string
}
