import _ from "lodash";
import mongoose from "mongoose";
import { login, password } from "../../../credentials.json";

export class MongooseConnectService {
  private static _instance: MongooseConnectService;

  public static getInstance(): MongooseConnectService {
    if (_.isNil(MongooseConnectService._instance)) {
      MongooseConnectService._instance = new MongooseConnectService();
    }
    return MongooseConnectService._instance;
  }

  public init(): Promise<void> {
    return mongoose
      .connect(
        `mongodb+srv://${login}:${password}@cluster0.zmch1.gcp.mongodb.net/hellforge-bot-db?retryWrites=true&w=majority`,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        }
      )
      .then((connection: unknown): void => {
        if (connection) {
          console.log(`Connected to MongoDB!`);
        }
      })
      .catch((err: string): void => {
        console.log(`Failed to connect to MongoDB because of: ${err}`);
      });
  }
}
