import { Connection } from "mongoose";
import { dbConfig } from "src/core/config/dbConfig";
import { UserSchema } from "src/core/schema/user.schema";
export const userModelProviders = [
    {
      provide: dbConfig.userModel,
      useFactory: (connection: Connection) =>
        connection.model(dbConfig.userCollection,UserSchema),
      inject: [dbConfig.dbName],
    },
  ];