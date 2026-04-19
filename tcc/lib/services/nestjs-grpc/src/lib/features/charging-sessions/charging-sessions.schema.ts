import {
    Prop,
    Schema,
    SchemaFactory
} from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import { 
    Connectors, 
    ConnectorsSchema 
} from '../connectors/connectors.schema';
import { 
    IdTokens, 
    IdTokensSchema 
} from '../id-token/id-token.schema';
import { 
    UserData, 
    UserDataSchema 
} from './user-data.schema';
import { 
    History, 
    HistorySchema 
} from './history.schema';

import { v4 as uuidv4 } from 'uuid';

export type ChargingSessionsDocument = HydratedDocument<ChargingSessions>;

@Schema({
    timestamps: true,
    collection: 'charging-sessions'
})
export class ChargingSessions {
    @Prop({ 
        default: () => uuidv4(),
        unique: true,
        index: true
    })
    transactionId: string;

    @Prop({type: IdTokensSchema})
    idToken: IdTokens;

    @Prop({ type: ConnectorsSchema })
    connector: Connectors;

    @Prop({  type: UserDataSchema })
    userData: UserData;

    @Prop({ required: true })
    minSoc: number;

    @Prop({ required: true })
    startSoc: number;

    @Prop({ required: true })
    stopSoc: number;

    @Prop({ required: true })
    currentSoc: number;

    @Prop({ 
        required: true, 
        enum: ['g2v', 'v2g']
    })
    chargingType: string;

    @Prop({ required: true })
    chargingStart: Date;

    @Prop({ required: true })
    chargingStop: Date;

    @Prop({ type: HistorySchema })
    history: History;
}

export const ChargingSessionsSchema = SchemaFactory.createForClass(ChargingSessions);
