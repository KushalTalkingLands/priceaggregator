import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlotModule } from './plot/plot.module';
import { MongooseModule } from '@nestjs/mongoose';
import { DbModule } from './db/db.module';

@Module({
  imports: [PlotModule, DbModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
