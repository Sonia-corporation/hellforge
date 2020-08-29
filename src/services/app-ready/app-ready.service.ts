import _ from "lodash";
import { Client } from "discord.js";
import { token } from "../../../credentials.json";
import { ActivityService } from "../activity/activity.service";
import { MongooseConnectService } from "../mongoose-connect/mongoose-connect.service";

export class AppReadyService {
  private static _instance: AppReadyService;

  public static getInstance(): AppReadyService {
    if (_.isNil(AppReadyService._instance)) {
      AppReadyService._instance = new AppReadyService();
    }
    return AppReadyService._instance;
  }

  public init(client: Client): void {
    void MongooseConnectService.getInstance().init();

    client.on(`ready`, (): void => {
      if (client.user) {
        void ActivityService.getInstance().setActivity(client.user, `WATCHING`);
        console.log(`Logged in as ${client.user.tag}!`);
      }
    });

    void client.login(token);
  }
}
