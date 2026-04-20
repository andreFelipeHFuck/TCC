import { Direction } from "./directions";
import { Energy } from "./energy-db";

export interface EnergyTransferPeriod {
    $id: string,
    direction: Direction,
    startCharging: Date,
    startSoC: number,
    stopCharging: Date,
    stopSoC: number,
    energy: Energy
}
