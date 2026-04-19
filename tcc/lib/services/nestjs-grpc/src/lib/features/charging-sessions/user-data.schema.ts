import {
    Prop,
    Schema,
    SchemaFactory
} from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import { 
    Vehicles, 
    VehiclesSchema 
} from '../vehicles/vehicles.schema';

export type UserDataDocument = HydratedDocument<UserData>;

@Schema({ _id: false })
export class UserData {
    @Prop({ required: true })
    userId: string;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    vehicleId: string;

    @Prop({ 
        required: true,
        type: VehiclesSchema
    })
    usersVehicles: Vehicles;
}

export const UserDataSchema = SchemaFactory.createForClass(UserData);
