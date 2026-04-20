import { Vehicle } from "../vehicles/vehicle-db"
import { User } from "./users-db"

export interface UserVehicle {
    $id: string,
    userId: string,
    minSoc: number,
    vehicle: Vehicle
}

export interface UserVehicles {
    user: User,
    vehicles: Vehicle[]
}
