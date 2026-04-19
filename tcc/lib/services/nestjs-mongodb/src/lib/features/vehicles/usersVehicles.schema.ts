import {
    Prop,
    Schema,
    SchemaFactory
} from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import { 
    Vehicles, 
    VehiclesSchema 
} from './vehicles.schema';

import { v4 as uuidv4 } from 'uuid';

export type UsersVehiclesDocument = HydratedDocument<UsersVehicles>;

@Schema({
    timestamps: true,
    collection: 'users-vehicles'
})
export class UsersVehicles {
    @Prop({ 
        default: () => uuidv4(),
        unique: true,
        index: true
    })
    vehicleId: string;

    @Prop({ required: true })
    minSoc: number;

    @Prop({ type: VehiclesSchema })
    vehicles: Vehicles;
}

export const UsersVehiclesSchema = SchemaFactory.createForClass(UsersVehicles);
