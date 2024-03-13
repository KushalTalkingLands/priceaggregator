import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { PlotDao } from 'src/core/dao/plot.dao';
import { PlotAggregationDto } from 'src/core/dto/priceAggregation.dto';
import { Plot } from 'src/core/interface/plot.interface';
import { LoggerConstant } from 'src/core/constants/loggerConstant';
import { ExceptionConstant } from 'src/core/constants/ExceptionConstant';

@Injectable()
export class PlotService {
  private readonly logger = new Logger(PlotService.name);
  constructor(private readonly plotDao: PlotDao) { }

  async create(plot: Plot): Promise<Plot> {
    this.logger.log(LoggerConstant.CreatePlotService);
    try {
      const createdPlot = await this.plotDao.create(plot);
      return createdPlot;
    } catch (error) {
      this.logger.error(LoggerConstant.CreatePlotServiceError);
      throw new HttpException(ExceptionConstant.CreatePlot, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(): Promise<Plot[]> {
    this.logger.log(LoggerConstant.FindAllService);
    try {
      const plots = await this.plotDao.findAll();
      return plots;
    } catch (error) {
      this.logger.error(LoggerConstant.FindAllServiceError);
      throw new HttpException(ExceptionConstant.PlotFindAll, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: string): Promise<Plot> {
    this.logger.log(LoggerConstant.FindOneService);
    try {
      const plot = await this.plotDao.findOne(id);
      if (!plot) {
        this.logger.warn(LoggerConstant.FindOneAlreadyExistError);
        throw new HttpException(ExceptionConstant.PlotNotFound, HttpStatus.NOT_FOUND);
      }
      return plot;
    } catch (error) {
      this.logger.error(LoggerConstant.FindOneServiceError);
      throw new HttpException(ExceptionConstant.PlotFindOne, HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: string, plot: Plot): Promise<Plot> {
    this.logger.log(LoggerConstant.UpdatePlotService);
    try {
      const updatedPlot = await this.plotDao.update(id, plot);
      return updatedPlot;
    } catch (error) {
      this.logger.error(LoggerConstant.UpdatePlotErrorService);
      throw new HttpException(ExceptionConstant.PlotUpdate, HttpStatus.BAD_REQUEST);
    }
  }

  async delete(id: string): Promise<void> {
    this.logger.log(LoggerConstant.DeletePlotService);
    try {
      await this.plotDao.delete(id);
    } catch (error) {
      this.logger.error(LoggerConstant.DeletePlotErrorService);
      throw new HttpException(ExceptionConstant.PlotDelete, HttpStatus.BAD_REQUEST);
    }
  }

  async aggregateByPrice(plotAggregationDto: PlotAggregationDto): Promise<Plot[]> {
    this.logger.log(LoggerConstant.PlotAggregationService);
    try {
      const aggregatedPlots = await this.plotDao.aggregateByPrice(plotAggregationDto);
      return aggregatedPlots;
    } catch (error) {
      this.logger.error(LoggerConstant.PlotAggregationErrorService);
      throw new HttpException(ExceptionConstant.PlotAggregate, HttpStatus.BAD_REQUEST);
    }
  }

}
