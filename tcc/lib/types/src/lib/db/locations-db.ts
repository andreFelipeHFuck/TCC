import { Address } from "./address-db"

export interface Coordinate {
    lat: number,
    lng: number
}

export interface Locations {
    $id: string,
    name: string,
    coordinate: Coordinate,
    address: Address
}
