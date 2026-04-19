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
import { 
    IdTokens, 
    IdTokensSchema 
} from '../id-token/id-token.schema';
import { UsersVehicles } from '../vehicles/usersVehicles.schema';

import { v4 as uuidv4 } from 'uuid';

export type UsersDocument = HydratedDocument<Users>;

@Schema({ 
    timestamps: true,
    collection: 'users' 
})
export class Users {
    @Prop({ 
        default: () => uuidv4(),
        unique: true,
        index: true
    })
    userId: string;
    
    @Prop({ required: true})
    name: string;

    @Prop({ 
        required: true,
        unique: true 
    })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ 
        required: true,
        enum: ['driver', 'administrator']
    })
    userType: string;

    @Prop({ required: true })
    photo: string;

    @Prop({ type: AddressSchema })
    address: Address;

    @Prop({ type: [IdTokensSchema] })
    idTokens: IdTokens[];

    @Prop({ type: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'UsersVehicles' }
    ]})
    usersVehicles: UsersVehicles[];
}

export const UsersSchema = SchemaFactory.createForClass(Users);
