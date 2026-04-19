import {
    Prop,
    Schema,
    SchemaFactory
} from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import { 
    Energy, 
    EnergySchema 
} from './energy.schema';

export type HistoryDocument = HydratedDocument<History>;

@Schema({ _id: false })
export class History {
    @Prop({ 
        required: true,
        type: EnergySchema 
    })
    current: Energy;

    @Prop({
        type: [EnergySchema],
        default: []
    })
    energyTransferPeriods: Energy[];
}

export const HistorySchema = SchemaFactory.createForClass(History);
