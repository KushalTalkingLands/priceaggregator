import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { dbConfig } from 'src/core/config/dbConfig';
@Module({
    imports:[MongooseModule.forRoot(dbConfig.dbUrl)],
    exports: [MongooseModule],
})
export class DbModule {}
