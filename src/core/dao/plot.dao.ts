import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Plot } from '../interface/plot.interface';
import { PlotAggregationDto } from '../dto/priceAggregation.dto';

@Injectable()
export class PlotDao {
  constructor(@InjectModel('Plot') private readonly plotModel: Model<Plot>) {}

  async create(plot: Plot): Promise<Plot> {
    const createdPlot = new this.plotModel(plot);
    return createdPlot.save();
  }

  async findAll(): Promise<Plot[]> {
    return this.plotModel.find().exec();
  }

  async findOne(id: string): Promise<Plot> {
    return this.plotModel.findById(id).exec();
  }

  async update(id: string, plot: Plot): Promise<Plot> {
    return this.plotModel.findByIdAndUpdate(id, plot, { new: true }).exec();
  }

  async delete(id: string): Promise<void> {
    await this.plotModel.findByIdAndDelete(id).exec();
  }
  async aggregateByPrice(plotAggregationDto: PlotAggregationDto): Promise<any> {
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

    return this.plotModel.aggregate(aggregationPipeline).exec();
  }
}
