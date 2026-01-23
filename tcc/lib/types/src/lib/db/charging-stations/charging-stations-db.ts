import { ProtocolVersionType } from "../../ocpp/ocpp-types.types";

export interface ChargingStation {
    $id: string,
    name: string,
    /** @todo adicionar atributo photo no banco */
    photo: string,
    endpoint: string,
    protocoloVersion: ProtocolVersionType,
    online: boolean,
    active: boolean,
    isSimulator: boolean,
}