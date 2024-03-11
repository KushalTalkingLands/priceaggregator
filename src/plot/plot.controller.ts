import { Body, Controller, Delete, Get, Logger, Param, Post, Put, Query } from '@nestjs/common';
import { Plot } from 'src/core/interface/plot.interface';
import { PlotService } from './plot.service';
import { PlotAggregationDto } from 'src/core/dto/priceAggregation.dto';

@Controller('plot')
export class PlotController {
  private readonly logger = new Logger(PlotController.name);
    constructor(private readonly plotService: PlotService) {}

  @Post()
  async create(@Body() plot: Plot): Promise<Plot> {
    this.logger.log(`Creating plot with data: ${JSON.stringify(plot)}`);
    // return this.plotService.create(plot);
    const createdPlot = await this.plotService.create(plot);
        this.logger.log(`Plot created: ${JSON.stringify(createdPlot)}`);
        return createdPlot;
  }

  @Get('aggregateByPrice')
  async aggregateByPrice(@Query() plotAggregationDto: PlotAggregationDto): Promise<Plot[]> {
    this.logger.log(`Aggregating plots by price with parameters: ${JSON.stringify(plotAggregationDto)}`);
        plotAggregationDto.pricePerSqft = Number(plotAggregationDto.pricePerSqft);
        plotAggregationDto.minPrice = Number(plotAggregationDto.minPrice);
        plotAggregationDto.maxPrice = Number(plotAggregationDto.maxPrice);
        const aggregatedPlots = await this.plotService.aggregateByPrice(plotAggregationDto);
        this.logger.log(`Aggregated plots: ${JSON.stringify(aggregatedPlots)}`);
        return aggregatedPlots;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() plot: Plot): Promise<Plot> {
    this.logger.log(`Updating plot with ID ${id} with data: ${JSON.stringify(plot)}`);
        const updatedPlot = await this.plotService.update(id, plot);
        this.logger.log(`Plot updated: ${JSON.stringify(updatedPlot)}`);
        return updatedPlot;
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    this.logger.log(`Deleting plot with ID ${id}`);
        await this.plotService.delete(id);
        this.logger.log(`Plot deleted successfully`);
  }

}
