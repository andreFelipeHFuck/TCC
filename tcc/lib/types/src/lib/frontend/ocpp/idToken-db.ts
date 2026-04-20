import { ProtocolVersionType } from "../../ocpp/ocpp-types.types";

export interface IdToken {
    $id: string,
    name: string,
    token: string,
    idTokenType: ProtocolVersionType
}
