export enum VehicleType {
    ELECTRIC = 'electric',
    HYBRID = 'hybrid'
}

export interface Vehicle {
    $id: string,
    brand: string,
    model: string,
    vehicleType: string,
}
