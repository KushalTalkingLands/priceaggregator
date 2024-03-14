import * as mongoose from "mongoose";
import { dbConfig } from "src/core/config/dbConfig";

export const databaseProviders = [
    {
      provide: dbConfig.dbName,
      useFactory: async (): Promise<typeof mongoose> =>
        mongoose.connect(dbConfig.dbUrl),
    },
];