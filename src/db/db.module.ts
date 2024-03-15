import { Module } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';
import { dbConfig } from 'src/core/config/dbConfig';
import { databaseProviders } from './db.provider';
import { modelProviders } from './model-Providers/model.provider';
import { userModelProviders } from './model-Providers/userModel.provider';
@Module({
    providers:[...databaseProviders,...modelProviders,...userModelProviders],
    exports: [...modelProviders,...databaseProviders,...userModelProviders],
})
export class DbModule {}
