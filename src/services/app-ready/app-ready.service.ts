import { Client } from 'discord.js';
import _ from 'lodash';
import { token } from '../../../credentials.json';
import { MongooseConnectService } from '../../services/mongoose-connect/mongoose-connect.service';
import { ActivityService } from '../activity/activity.service';

export class AppReadyService {
  private static _instance: AppReadyService;

  public static getInstance(): AppReadyService {
    if (_.isNil(AppReadyService._instance)) {
      AppReadyService._instance = new AppReadyService();
    }
    return AppReadyService._instance;
  }

  public init(client: Client): void {
    MongooseConnectService.getInstance().init();

    client.on('ready', () => {
      if (client.user) {
        ActivityService.getInstance().setActivity(client.user, 'WATCHING');
        this._log(client.user.tag);
      }
    });

    client.login(token);
  }

  private _log(usertag: string): void {
    return console.log(`Logged in as ${usertag}!`);
  }
}
