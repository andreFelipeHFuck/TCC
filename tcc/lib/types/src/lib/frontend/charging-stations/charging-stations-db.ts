import { ProtocolVersionType } from "../../ocpp/ocpp-types.types";
import { Connector } from "./connectors-db";

export interface ChargingStation {
    $id: string,
    name: string,
    photo: string,
    endpoint: string,
    protocoloVersion: ProtocolVersionType,
    online: boolean,
    active: boolean,
    isSimulator: boolean,
    connectors?: Connector[]
}
