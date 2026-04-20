import {
    Prop,
    Schema,
    SchemaFactory
} from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import { v4 as uuidv4 } from 'uuid';

export type ConnectionsDocument = HydratedDocument<Connectors>;

@Schema({ 
    timestamps: true,
    _id: false 
})
export class Connectors {
    @Prop({ 
        default: () => uuidv4(),
        unique: true,
        index: true
    })
    connectorId: string;

    @Prop({ required: true })
    active: boolean;

    @Prop({ required: true })
    connectorStatus: boolean;

    @Prop({ 
        required: true,
        enum: [
            'SAE_J1772',
            'IEC_62196',
            'GB_T_20234',
            'CHAdeMO',
            'TESLA'
        ]
    })
    connectorType: string;
} 

export const ConnectorsSchema = SchemaFactory.createForClass(Connectors);
