import { Module } from '@nestjs/common';
import { PlotModule } from './plot/plot.module';
import { MongooseModule } from '@nestjs/mongoose';
import { DbModule } from './db/db.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [PlotModule,UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
