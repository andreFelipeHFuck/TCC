import {
    Prop,
    Schema,
    SchemaFactory
} from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type VehiclesDocument = HydratedDocument<Vehicles>;

@Schema({ _id: false })
export class Vehicles {
    @Prop({ required: true })
    brand: string;

    @Prop({ required: true })
    model: string;

    @Prop({ 
        required: true,
        enum: ['electric', 'hybrid']
    })
    vehicleType: string;
}

export const VehiclesSchema = SchemaFactory.createForClass(Vehicles);
