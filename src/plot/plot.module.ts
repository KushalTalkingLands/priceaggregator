import { Module } from '@nestjs/common';
import { PlotController } from './plot.controller';
import { PlotService } from './plot.service';
import { PlotSchema } from 'src/core/schema/plot.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { PlotDao } from 'src/core/dao/plot.dao';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Plot', schema: PlotSchema }]),
  ],
  controllers: [PlotController],
  providers: [PlotService,PlotDao]
})
export class PlotModule {}
