import { ActivityType, ClientUser } from "discord.js";
import _ from "lodash";

export class ActivityService {
  private static _instance: ActivityService;

  public static getInstance(): ActivityService {
    if (_.isNil(ActivityService._instance)) {
      ActivityService._instance = new ActivityService();
    }
    return ActivityService._instance;
  }

  public setActivity(user: ClientUser, activity: ActivityType): void {
    user
      .setActivity(`!hell help`, { type: activity })
      .then((): void => {
        console.info(`The bot activity was set to: ${activity}`);
      })
      .catch((err: string): void => {
        console.error(`The bot encountered an error that was: ${err}`);
      });
  }
}
