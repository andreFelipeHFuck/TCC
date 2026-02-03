import { Connector } from "../charging-stations/connectors-db"
import { Energy } from "../energy/energy-db"
import { EnergyTransferPeriod } from "../energy/energy-transfer-periods-db"
import { IdToken } from "../ocpp/idToken-db"
import { Vehicle } from "../vehicles/vehicle-db"

export enum ChargingType {
    G2V = 'g2v',
    V2G = 'v2g'
}

export interface EnergyTransferHistorical {
    energy: Energy,
    energyTraferPeriod: EnergyTransferPeriod[]
}

export interface ChargingSession {
    $id: string,
    transactionId: string,
    chargingType: ChargingType,
    currentSoC: number,
    idToken?: IdToken,
    vehicle?: Vehicle,
    connector?: Connector,
    energyTransferHistorical?: EnergyTransferHistorical
}
