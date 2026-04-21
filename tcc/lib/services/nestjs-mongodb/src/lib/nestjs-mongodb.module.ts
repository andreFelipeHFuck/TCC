import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';

import { 
  Users, 
  UsersSchema 
} from './features/users/users.schema';
import { 
  Locations, 
  LocationsSchema 
} from './features/locations/location.schema';
import { 
  ChargingStations, 
  ChargingStationsSchema 
} from './features/charging-stations/charging-stations.schema';
import { 
  ChargingSessions, 
  ChargingSessionsSchema 
} from './features/charging-sessions/charging-sessions.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://admin:mongo123@localhost:27017/tcc-teste?authSource=admin'),

    MongooseModule.forFeature([
      { name: Users.name, schema: UsersSchema },
      { name: Locations.name, schema: LocationsSchema },
      { name: ChargingStations.name, schema: ChargingStationsSchema },
      { name: ChargingSessions.name, schema: ChargingSessionsSchema },
    ])
  ],
  exports: [MongooseModule],
})
export class NestjsMongodbModule {}
