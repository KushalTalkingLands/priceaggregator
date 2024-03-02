import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlotModule } from './plot/plot.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/testing'),PlotModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
