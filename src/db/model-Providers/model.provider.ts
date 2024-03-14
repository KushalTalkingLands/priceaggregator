import { Connection } from "mongoose";
import { dbConfig } from "src/core/config/dbConfig";
import { PlotSchema } from "src/core/schema/plot.schema";

export const modelProviders = [
    {
      provide: dbConfig.Model,
      useFactory: (connection: Connection) =>
        connection.model(dbConfig.collectionName,PlotSchema),
      inject: [dbConfig.dbName],
    },
  ];