import { Direction } from "./directions";

export type Energy = {
    $id: string,
    currentDirection: Direction,
    currentSoc: number,
    currentEnergyKWh: number
}
