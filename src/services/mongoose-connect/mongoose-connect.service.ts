import _ from "lodash";

export class MongooseConnectService {
  private static _instance: MongooseConnectService;

  public static getInstance(): MongooseConnectService {
    if (_.isNil(MongooseConnectService._instance)) {
      MongooseConnectService._instance = new MongooseConnectService();
    }
    return MongooseConnectService._instance;
  }

  // @todo fix it
  // public init() {
  //   mongoose.connect(
  //     `mongodb+srv://${login}:${password}@cluster0.zmch1.gcp.mongodb.net/hellforge-bot-db?retryWrites=true&w=majority`,
  //     {
  //       useNewUrlParser: true,
  //       useUnifiedTopology: true,
  //     },
  //     (error: Error) => {
  //       if (error) {
  //         throw error;
  //       }
  //
  //       console.log(`Connected to MongoDB!`);
  //     }
  //   );
  // }
}
