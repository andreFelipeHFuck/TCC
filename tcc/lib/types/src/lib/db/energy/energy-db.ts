import { Direction } from "./directions";

export interface Energy {
    $id: string,
    currentDirection: Direction,
    currentSoc: number,
    currentEnergyKWh: number
}
