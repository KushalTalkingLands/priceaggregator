import { Model } from 'mongoose';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Plot } from '../interface/plot.interface';
import { PlotAggregationDto } from '../dto/priceAggregation.dto';

@Injectable()
export class PlotDao {
  private readonly logger = new Logger(PlotDao.name);
  constructor(@InjectModel('Plot') private readonly plotModel: Model<Plot>) { }

  async create(plot: Plot): Promise<Plot> {
    this.logger.log(`Creating plot: ${JSON.stringify(plot)}`);
    try {
      const createdPlot = new this.plotModel(plot);
      return createdPlot.save();
    } catch (error) {
      this.logger.error(`Error creating plot in DAO: ${error.message}`);
      throw new HttpException('Error creating plot', HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(): Promise<Plot[]> {
    this.logger.log('Finding all plots');
    try {
      const plots = await this.plotModel.find().exec();
      return plots;
    } catch (error) {
      this.logger.error(`Error finding all plots in DAO: ${error.message}`);
      throw new HttpException('Error finding all plots', HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: string): Promise<Plot> {
    this.logger.log(`Finding plot by ID: ${id}`);
    try {
      const plot = await this.plotModel.findById(id).exec();
      return plot;
    } catch (error) {
      this.logger.error(`Error finding plot by ID in DAO: ${error.message}`);
      throw new HttpException('Error finding plot', HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: string, plot: Plot): Promise<Plot> {
    this.logger.log(`Updating plot with ID ${id}: ${JSON.stringify(plot)}`);
    try {
      const updatedPlot = await this.plotModel.findByIdAndUpdate(id, plot, { new: true }).exec();
      return updatedPlot;
    } catch (error) {
      this.logger.error(`Error updating plot in DAO: ${error.message}`);
      throw new HttpException('Error updating plot', HttpStatus.BAD_REQUEST);
    }
  }

  async delete(id: string): Promise<void> {
    this.logger.log(`Deleting plot with ID: ${id}`);
    try {
      await this.plotModel.findByIdAndDelete(id).exec();
      this.logger.log('Plot deleted successfully');
    } catch (error) {
      this.logger.error(`Error deleting plot in DAO: ${error.message}`);
      throw new HttpException('Error deleting plot', HttpStatus.BAD_REQUEST);
    }
  }
  async aggregateByPrice(plotAggregationDto: PlotAggregationDto): Promise<any> {
    this.logger.log(`Aggregating plots by price with parameters: ${JSON.stringify(plotAggregationDto)}`);
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

      this.logger.log(`Aggregated plots: ${JSON.stringify(result)}`);

      return result;
    } catch (error) {
      this.logger.error(`Error aggregating plots by price in DAO: ${error.message}`);
      throw new HttpException('Error aggregating plots by price', HttpStatus.BAD_REQUEST);
    }
  }
}
