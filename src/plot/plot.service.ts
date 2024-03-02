import { Injectable } from '@nestjs/common';
import { PlotDao } from 'src/core/dao/plot.dao';
import { PlotAggregationDto } from 'src/core/dto/priceAggregation.dto';
import { Plot } from 'src/core/interface/plot.interface';

@Injectable()
export class PlotService {
    constructor(private readonly plotDao: PlotDao) {}

  async create(plot: Plot): Promise<Plot> {
    return this.plotDao.create(plot);
  }

  async findAll(): Promise<Plot[]> {
    return this.plotDao.findAll();
  }

  async findOne(id: string): Promise<Plot> {
    return this.plotDao.findOne(id);
  }

  async update(id: string, plot: Plot): Promise<Plot> {
    return this.plotDao.update(id, plot);
  }

  async delete(id: string): Promise<void> {
    return this.plotDao.delete(id);
  }

  async aggregateByPrice(plotAggregationDto: PlotAggregationDto): Promise<Plot[]> {
    return this.plotDao.aggregateByPrice(plotAggregationDto);
  }
  
}
