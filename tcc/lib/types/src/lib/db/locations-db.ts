import { Address } from "./address-db"
import { ChargingStation } from "./charging-stations/charging-stations-db"

export interface Coordinate {
    lat: number,
    lng: number
}

export interface Locations {
    $id: string,
    name: string,
    coordinate: Coordinate,
    address: Address
    chargingStations?: ChargingStation[]
}
