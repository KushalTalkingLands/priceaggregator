import { Model } from 'mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Plot } from '../interface/plot.interface';
import { PlotAggregationDto } from '../dto/priceAggregation.dto';

@Injectable()
export class PlotDao {
  private readonly logger = new Logger(PlotDao.name);
  constructor(@InjectModel('Plot') private readonly plotModel: Model<Plot>) {}

  async create(plot: Plot): Promise<Plot> {
    this.logger.log(`Creating plot: ${JSON.stringify(plot)}`);
    const createdPlot = new this.plotModel(plot);
    return createdPlot.save();
  }

  async findAll(): Promise<Plot[]> {
    this.logger.log('Finding all plots');
    return this.plotModel.find().exec();
  }

  async findOne(id: string): Promise<Plot> {
    this.logger.log(`Finding plot by ID: ${id}`);
    return this.plotModel.findById(id).exec();
  }

  async update(id: string, plot: Plot): Promise<Plot> {
    this.logger.log(`Updating plot with ID ${id}: ${JSON.stringify(plot)}`);
    return this.plotModel.findByIdAndUpdate(id, plot, { new: true }).exec();
  }

  async delete(id: string): Promise<void> {
    this.logger.log(`Deleting plot with ID: ${id}`);
    await this.plotModel.findByIdAndDelete(id).exec();
    this.logger.log('Plot deleted successfully');
  }
  async aggregateByPrice(plotAggregationDto: PlotAggregationDto): Promise<any> {
    this.logger.log(`Aggregating plots by price with parameters: ${JSON.stringify(plotAggregationDto)}`);
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
  }
}
