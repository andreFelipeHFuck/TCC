import { Module } from '@nestjs/common';

import { NestjsMongodbModule } from '@tcc/nestjs-mongodb';

import { UserModule } from './users/users.module';

@Module({
  imports: [
    UserModule,
    NestjsMongodbModule
  ],
  controllers: [],
  providers: [],
  exports: [UserModule],
})
export class NestjsApiRestModule {}
