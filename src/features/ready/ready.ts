import _ from "lodash"
import { ClientUser, ActivityType } from "discord.js"

export class Ready {
  private static _instance: Ready

  public static getInstance(): Ready {
    if(_.isNil(Ready._instance)) {
      Ready._instance = new Ready()
    }
    return Ready._instance
  }

  public setActivity(user: ClientUser | null, activity: ActivityType) {
    user?.setActivity("!hell help", { type: activity })
  }

  public log(usertag: string | undefined): void {
    return console.log(`Logged in as ${usertag}!`)
  }
}
