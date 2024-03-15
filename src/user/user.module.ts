import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserDao } from 'src/core/dao/user.dao';
import { UserSchema } from 'src/core/schema/user.schema';
import { CoreModule } from 'src/core/core.module';

@Module({
  imports: [CoreModule],
  controllers: [UserController],
  providers: [UserService, UserDao],
})
export class UserModule {}