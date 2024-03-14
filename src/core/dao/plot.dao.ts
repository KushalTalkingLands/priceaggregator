import { Model } from 'mongoose';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Plot } from '../interface/plot.interface';
import { PlotAggregationDto } from '../dto/priceAggregation.dto';
import { LoggerConstant } from '../constants/loggerConstant';
import { ExceptionConstant } from '../constants/ExceptionConstant';
import { dbConfig } from '../config/dbConfig';

@Injectable()
export class PlotDao {
  private readonly logger = new Logger(PlotDao.name);
  constructor(@InjectModel(dbConfig.Model) private readonly plotModel: Model<Plot>) { }

  async create(plot: Plot): Promise<Plot> {
    this.logger.log(LoggerConstant.CreatePlotDao);
    try {
      const createdPlot = new this.plotModel(plot);
      return createdPlot.save();
    } catch (error) {
      this.logger.error(LoggerConstant.CreatePlotDaoError);
      throw new HttpException(ExceptionConstant.CreatePlot, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(): Promise<Plot[]> {
    this.logger.log(LoggerConstant.FindAllDao);
    try {
      const plots = await this.plotModel.find().exec();
      return plots;
    } catch (error) {
      this.logger.error(LoggerConstant.FindAllDaoError);
      throw new HttpException(ExceptionConstant.PlotFindAll, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: string): Promise<Plot> {
    this.logger.log(LoggerConstant.FindOneDao);
    try {
      const plot = await this.plotModel.findById(id).exec();
      return plot;
    } catch (error) {
      this.logger.error(LoggerConstant.FindOneDaoError);
      throw new HttpException(ExceptionConstant.PlotFindOne, HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: string, plot: Plot): Promise<Plot> {
    this.logger.log(LoggerConstant.UpdatePlotDao);
    try {
      const updatedPlot = await this.plotModel.findByIdAndUpdate(id, plot, { new: true }).exec();
      return updatedPlot;
    } catch (error) {
      this.logger.error(LoggerConstant.UpdatePlotErrorDao);
      throw new HttpException(ExceptionConstant.PlotUpdate, HttpStatus.BAD_REQUEST);
    }
  }

  async delete(id: string): Promise<void> {
    this.logger.log(LoggerConstant.DeletePlotDao);
    try {
      await this.plotModel.findByIdAndDelete(id).exec();
      this.logger.log(LoggerConstant.DeletePlotSuccessDao);
    } catch (error) {
      this.logger.error(LoggerConstant.DeletePlotErrorDao);
      throw new HttpException(ExceptionConstant.PlotDelete, HttpStatus.BAD_REQUEST);
    }
  }
  async aggregateByPrice(plotAggregationDto: PlotAggregationDto): Promise<any> {
    this.logger.log(LoggerConstant.PlotAggregationDao);
    try {
      const aggregationPipeline = [
        {
          $addFields: {
            plotPrice: {
              $cond: {
                if: {
                  $eq: ["$plotArea.unit", "sqft"],
                },
                then: {
                  $multiply: [
                    { $toDouble: "$plotArea.value" },
                    plotAggregationDto.pricePerSqft,
                  ],
                },
                else: {
                  $multiply: [
                    { $toDouble: "$plotArea.value" },
                    { $multiply: [plotAggregationDto.pricePerSqft, 43560] },
                  ],
                },
              },
            },
          },
        },
        {
          $match: {
            plotPrice: {
              $exists: true,
              $gte: plotAggregationDto.minPrice,
              $lte: plotAggregationDto.maxPrice,
            },
          },
        },
      ];

      const result = await this.plotModel.aggregate(aggregationPipeline).exec();

      this.logger.log(LoggerConstant.PlotAggregationDao);

      return result;
    } catch (error) {
      this.logger.error(LoggerConstant.PlotAggregationErrorDao);
      throw new HttpException(ExceptionConstant.PlotAggregate, HttpStatus.BAD_REQUEST);
    }
  }
}
