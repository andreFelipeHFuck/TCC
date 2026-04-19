import {
    Prop,
    Schema,
    SchemaFactory
} from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ChargingStationDataDocument = HydratedDocument<ChargingStationData>;

@Schema({ _id: false })
export class ChargingStationData {
    @Prop({ required: true })
    name: string;

    @Prop({ 
        required: true,
        enum: ['ocpp1.6', 'ocpp2.1']
    })
    protocol: string;

    @Prop({ required: true })
    endpoint: string;

    @Prop({ required: true })
    online: boolean;

    @Prop({ required: true })
    active: boolean;

    @Prop({ required: true })
    public: boolean;

    @Prop({ required: true })
    isSimulator: boolean;
}

export const ChargingStationDataSchema = SchemaFactory.createForClass(ChargingStationData);
