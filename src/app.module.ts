import { Module } from '@nestjs/common';
import { PlotModule } from './plot/plot.module';
import { MongooseModule } from '@nestjs/mongoose';
import { DbModule } from './db/db.module';

@Module({
  imports: [PlotModule, DbModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
