import { Module } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';
import { dbConfig } from 'src/core/config/dbConfig';
import { databaseProviders } from './db.provider';
import { modelProviders } from './model-Providers/model.provider';
@Module({
    providers:[...databaseProviders,...modelProviders],
    exports: [...modelProviders,...databaseProviders],
})
export class DbModule {}
