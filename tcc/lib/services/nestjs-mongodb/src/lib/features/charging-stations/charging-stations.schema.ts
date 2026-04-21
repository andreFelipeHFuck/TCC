import {
    Prop,
    Schema,
    SchemaFactory
} from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

import { 
    Connectors, 
    ConnectorsSchema 
} from '../connectors/connectors.schema';

import { v4 as uuidv4 } from 'uuid';

export type ChargingStationsDocument = HydratedDocument<ChargingStations>;

@Schema({ 
    timestamps: true,
    collection: 'charging-stations' 
})
export class ChargingStations {
    @Prop({ 
        default: () => uuidv4(),
        unique: true,
        index: true
    })
    chargingStationId: string;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    endpoint: string;

    @Prop({ required: true })
    photo: string;

    @Prop({ 
        required: true,
        enum:  ['ocpp1.6', 'ocpp2.1']
    })
    protocolVersion: string;

    @Prop({ type: [ConnectorsSchema]})
    connectors: Connectors[];

    @Prop({ required: true })
    online: boolean;

    @Prop({ active: true })
    active: boolean;

    @Prop({ required: true })
    isSimulator: boolean;
}

export const ChargingStationsSchema = SchemaFactory.createForClass(ChargingStations);
