import _ from "lodash"
import * as Discord from "discord.js"
import { token } from "../../credentials.json"

export class Hellforge {
  private static _instance: Hellforge
  private _client = new Discord.Client()

  public static getInstance(): Hellforge {
    if(_.isNil(Hellforge._instance)) {
      Hellforge._instance = new Hellforge()
    }
    return Hellforge._instance
  }

  public init(): void {
    this._client.on('ready', () => {
      this._client.user?.setActivity("!hell help", {type: "PLAYING"})
      console.log(`Logged in as ${this._client.user?.tag}!`)
    })

    this._client.login(token)
  }
}

Hellforge.getInstance().init()
