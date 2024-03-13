import { Body, Controller, Delete, Get, HttpException, HttpStatus, Logger, Param, Post, Put, Query } from '@nestjs/common';
import { Plot } from 'src/core/interface/plot.interface';
import { PlotService } from './plot.service';
import { PlotAggregationDto } from 'src/core/dto/priceAggregation.dto';
import { LoggerConstant } from 'src/core/constants/loggerConstant';

@Controller('plot')
export class PlotController {
  private readonly logger = new Logger(PlotController.name);
  constructor(private readonly plotService: PlotService) { }

  @Post()
  async create(@Body() plot: Plot): Promise<Plot> {
    this.logger.log(LoggerConstant.CreatePlotController);
    // return this.plotService.create(plot);
    try {
      const createdPlot = await this.plotService.create(plot);
      this.logger.log(LoggerConstant.PlotCreated);
      return createdPlot;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('aggregateByPrice')
  async aggregateByPrice(@Query() plotAggregationDto: PlotAggregationDto): Promise<Plot[]> {
    this.logger.log(LoggerConstant.PlotAggregationController);
    try {
      plotAggregationDto.pricePerSqft = Number(plotAggregationDto.pricePerSqft);
      plotAggregationDto.minPrice = Number(plotAggregationDto.minPrice);
      plotAggregationDto.maxPrice = Number(plotAggregationDto.maxPrice);
      const aggregatedPlots = await this.plotService.aggregateByPrice(plotAggregationDto);
      return aggregatedPlots;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() plot: Plot): Promise<Plot> {
    this.logger.log(LoggerConstant.UpdatePlotController);
    try {
      const updatedPlot = await this.plotService.update(id, plot);
      return updatedPlot;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    this.logger.log(LoggerConstant.DeletePlotController);
    try {
      await this.plotService.delete(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

}
