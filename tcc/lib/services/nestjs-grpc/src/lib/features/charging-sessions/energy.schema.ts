import {
    Prop,
    Schema,
    SchemaFactory
} from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type EnergyDocument = HydratedDocument<Energy>;

@Schema({
    _id: false
})
export class Energy {
    @Prop({ 
        required: true,
        enum: ['toVehicle', 'toGrid']
    })
    direction: string;

    @Prop({ required: true })
    startCharging: Date;

    @Prop({ required: true })
    startSoc: number;

    @Prop({ required: true })
    stopCharging: Date;
    
    @Prop({ required: true })
    stopSoc: number;   
}

export const EnergySchema = SchemaFactory.createForClass(Energy);
