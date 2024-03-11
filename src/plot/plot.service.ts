import { Injectable, Logger } from '@nestjs/common';
import { PlotDao } from 'src/core/dao/plot.dao';
import { PlotAggregationDto } from 'src/core/dto/priceAggregation.dto';
import { Plot } from 'src/core/interface/plot.interface';

@Injectable()
export class PlotService {
  private readonly logger = new Logger(PlotService.name);
    constructor(private readonly plotDao: PlotDao) {}

  async create(plot: Plot): Promise<Plot> {
    this.logger.log(`Creating plot: ${JSON.stringify(plot)}`);
    const createdPlot = await this.plotDao.create(plot);
    this.logger.log(`Plot created: ${JSON.stringify(createdPlot)}`);
    return createdPlot;
  }

  async findAll(): Promise<Plot[]> {
    this.logger.log('Finding all plots');
        return this.plotDao.findAll();
  }

  async findOne(id: string): Promise<Plot> {
    this.logger.log(`Finding plot by ID: ${id}`);
    return this.plotDao.findOne(id);
  }

  async update(id: string, plot: Plot): Promise<Plot> {
    this.logger.log(`Updating plot with ID ${id}: ${JSON.stringify(plot)}`);
        const updatedPlot = await this.plotDao.update(id, plot);
        this.logger.log(`Plot updated: ${JSON.stringify(updatedPlot)}`);
        return updatedPlot;
  }

  async delete(id: string): Promise<void> {
    this.logger.log(`Deleting plot with ID: ${id}`);
        await this.plotDao.delete(id);
        this.logger.log('Plot deleted successfully');
  }

  async aggregateByPrice(plotAggregationDto: PlotAggregationDto): Promise<Plot[]> {
    this.logger.log(`Aggregating plots by price with parameters: ${JSON.stringify(plotAggregationDto)}`);
        return this.plotDao.aggregateByPrice(plotAggregationDto);
  }
  
}
