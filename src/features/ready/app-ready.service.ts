import _ from "lodash"
import { ClientUser, ActivityType, Client } from "discord.js"
import { token } from "../../../credentials.json"

export class AppReadyServivce {
  private static _instance: AppReadyServivce

  public static getInstance(): AppReadyServivce {
    if(_.isNil(AppReadyServivce._instance)) {
      AppReadyServivce._instance = new AppReadyServivce()
    }
    return AppReadyServivce._instance
  }

  public init(client: Client) {
    client.on('ready', () => {
      if (client && client.user) {
        this._setActivity(client.user, "WATCHING")
        this._log(client.user.tag)
      }
    })

    client.login(token)
  }

  private _setActivity(user: ClientUser, activity: ActivityType) {
    user?.setActivity("!hell help", { type: activity })
  }

  private _log(usertag: string): void {
    return console.log(`Logged in as ${usertag}!`)
  }
}