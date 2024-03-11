import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { PlotDao } from 'src/core/dao/plot.dao';
import { PlotAggregationDto } from 'src/core/dto/priceAggregation.dto';
import { Plot } from 'src/core/interface/plot.interface';

@Injectable()
export class PlotService {
  private readonly logger = new Logger(PlotService.name);
  constructor(private readonly plotDao: PlotDao) { }

  async create(plot: Plot): Promise<Plot> {
    this.logger.log(`Creating plot: ${JSON.stringify(plot)}`);
    try {
      const createdPlot = await this.plotDao.create(plot);
      return createdPlot;
    } catch (error) {
      this.logger.error(`Error creating plot: ${error.message}`);
      throw new HttpException('Error creating plot', HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(): Promise<Plot[]> {
    this.logger.log('Finding all plots');
    try {
      const plots = await this.plotDao.findAll();
      return plots;
    } catch (error) {
      this.logger.error(`Error finding all plots: ${error.message}`);
      throw new HttpException('Error finding all plots', HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: string): Promise<Plot> {
    this.logger.log(`Finding plot by ID: ${id}`);
    try {
      const plot = await this.plotDao.findOne(id);
      if (!plot) {
        this.logger.warn(`Plot with ID ${id} not found`);
        throw new HttpException('Plot not found', HttpStatus.NOT_FOUND);
      }
      return plot;
    } catch (error) {
      this.logger.error(`Error finding plot by ID: ${error.message}`);
      throw new HttpException('Error finding plot', HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: string, plot: Plot): Promise<Plot> {
    this.logger.log(`Updating plot with ID ${id}: ${JSON.stringify(plot)}`);
    try {
      const updatedPlot = await this.plotDao.update(id, plot);
      return updatedPlot;
    } catch (error) {
      this.logger.error(`Error updating plot with ID ${id}: ${error.message}`);
      throw new HttpException('Error updating plot', HttpStatus.BAD_REQUEST);
    }
  }

  async delete(id: string): Promise<void> {
    this.logger.log(`Deleting plot with ID: ${id}`);
    try {
      await this.plotDao.delete(id);
    } catch (error) {
      this.logger.error(`Error deleting plot with ID ${id}: ${error.message}`);
      throw new HttpException('Error deleting plot', HttpStatus.BAD_REQUEST);
    }
  }

  async aggregateByPrice(plotAggregationDto: PlotAggregationDto): Promise<Plot[]> {
    this.logger.log(`Aggregating plots by price with parameters: ${JSON.stringify(plotAggregationDto)}`);
    try {
      const aggregatedPlots = await this.plotDao.aggregateByPrice(plotAggregationDto);
      return aggregatedPlots;
    } catch (error) {
      this.logger.error(`Error aggregating plots by price: ${error.message}`);
      throw new HttpException('Error aggregating plots by price', HttpStatus.BAD_REQUEST);
    }
  }

}
