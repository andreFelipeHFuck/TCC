import {
    Prop,
    Schema,
    SchemaFactory
} from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

import { 
    Address, 
    AddressSchema 
} from '../address/address.schema';
import { ChargingStations } from '../charging-stations/charging-stations.schema';

import { Point, PointSchema } from './point.schema';    

import { v4 as uuidv4 } from 'uuid';

export type LocationsDocument = HydratedDocument<Locations>;

@Schema({
    timestamps: true,
    collection: 'locations'
})
export class Locations {
    @Prop({ 
        default: () => uuidv4(),
        unique: true,
        index: true
    })
    locationId: string;
    
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    operatorName: string;

    @Prop({ required: true })
    picture: string;

    @Prop({ type: AddressSchema })
    address: Address;

    @Prop({ 
        type: PointSchema, 
        index: '2dsphere'
    })
    location: Point;

    @Prop({ type: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'ChargingStations' }
    ]})
    chargingStations: ChargingStations[];
}

export const LocationsSchema = SchemaFactory.createForClass(Locations);
