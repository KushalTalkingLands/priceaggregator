import { Schema } from 'mongoose';
import { Plot } from '../interface/plot.interface';
export const PlotSchema = new Schema<Plot>({
    plotName: { type: String, required: true },
    plotArea: {
      value: { type: Number, required: true },
      unit: { type: String, required: true },
    },
    plotStatus: { type: String, required: true },
});