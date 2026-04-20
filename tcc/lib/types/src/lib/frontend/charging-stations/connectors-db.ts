export enum ConnectorType {
    SAE_J1772 = 'SAR_J1772',
    IEC_62196 = 'IEC_62196',
    GB_T_20234 = 'GB_T_20234',
    CHAdeMO =  'CHAdeMO',
    TESLA =    'TESLA'
}

export interface Connector {
    $id: string,
    connectorId: string,
    active: boolean,
    connectorStatus: boolean,
    connectorType: ConnectorType
}
