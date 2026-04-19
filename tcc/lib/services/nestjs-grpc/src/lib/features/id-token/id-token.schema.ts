import {
    Prop,
    Schema,
    SchemaFactory
} from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type IdTokensDocument = HydratedDocument<IdTokens>;

@Schema({ _id: false })
export class IdTokens {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    token: string;

    @Prop({ 
        required: true,
        enum: ['ocpp1.6', 'ocpp2.1']
    })
    idTokenType: string;
}

export const IdTokensSchema = SchemaFactory.createForClass(IdTokens);
