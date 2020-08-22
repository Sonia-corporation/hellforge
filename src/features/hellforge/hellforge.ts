import _ from "lodash"
import * as Discord from "discord.js"
import { token } from "../../../credentials.json"
import { Ready } from "../ready/ready"
import { MessageManager } from "../message-manager/message-manager"

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
    this._client.on('ready', (): void => {
      Ready.getInstance().setActivity(this._client.user, "WATCHING")
      Ready.getInstance().log(this._client.user?.tag)
    })

    this._client.on('message', (msg: Discord.Message): void => {
      MessageManager.getInstance().answerMessage(msg)
    })

    this._client.login(token)
  }
}

Hellforge.getInstance().init()
