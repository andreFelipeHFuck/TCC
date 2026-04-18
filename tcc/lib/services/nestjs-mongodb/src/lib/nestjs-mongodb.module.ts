import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/tcc-teste'),
  ],
  controllers: [],
  providers: [],
  exports: [MongooseModule],
})
export class NestjsMongodbModule {}
