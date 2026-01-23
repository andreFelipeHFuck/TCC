import { EnergyTransferPeriod } from "../energy/energy-transfer-periods-db"

export enum ChargingType {
    G2V = 'g2v',
    V2G = 'v2g'
}

export interface ChargingSession {
    $id: string,
    transactionId: string,
    chargingType: ChargingType,
    currentSoC: number
    energy: EnergyTransferPeriod
}