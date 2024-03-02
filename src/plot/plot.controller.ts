import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { Plot } from 'src/core/interface/plot.interface';
import { PlotService } from './plot.service';
import { PlotAggregationDto } from 'src/core/dto/priceAggregation.dto';

@Controller('plot')
export class PlotController {
    constructor(private readonly plotService: PlotService) {}

  @Post()
  create(@Body() plot: Plot): Promise<Plot> {
    return this.plotService.create(plot);
  }

  @Get('aggregateByPrice')
  aggregateByPrice(@Query() plotAggregationDto: PlotAggregationDto): Promise<Plot[]> {
    plotAggregationDto.pricePerSqft = Number(plotAggregationDto.pricePerSqft);
  plotAggregationDto.minPrice = Number(plotAggregationDto.minPrice);
  plotAggregationDto.maxPrice = Number(plotAggregationDto.maxPrice);
    return this.plotService.aggregateByPrice(plotAggregationDto);
  }

//   @Get()
//   findAll(): Promise<Plot[]> {
//     return this.plotService.findAll();
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string): Promise<Plot> {
//     return this.plotService.findOne(id);
//   }

  @Put(':id')
  update(@Param('id') id: string, @Body() plot: Plot): Promise<Plot> {
    return this.plotService.update(id, plot);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.plotService.delete(id);
  }

}
