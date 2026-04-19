import {
    Prop,
    Schema,
    SchemaFactory
} from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AddressDocument = HydratedDocument<Address>;

@Schema({ _id: false })
export class Address {
    @Prop({ required: true })
    state: string;

    @Prop({ required: true })
    city: string;

    @Prop({ required: true })
    neighborhood: string;

    @Prop({ required: true })
    street: string;

    @Prop({ required: true })
    cep: string; 

    @Prop({ required: true })
    streetNumber: number;
}

export const AddressSchema = SchemaFactory.createForClass(Address);
