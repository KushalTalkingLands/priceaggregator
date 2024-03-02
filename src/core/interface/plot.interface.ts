import { Document } from "mongoose";
export interface Plot extends Document {
    plotName: string;
    plotArea: {
      value: number;
      unit: string;
    };
    plotStatus: string;
}