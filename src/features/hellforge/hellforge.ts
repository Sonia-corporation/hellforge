import _ from "lodash"
import { Client } from "discord.js"
import { token } from "../../../credentials.json"
import { Ready } from "../ready/ready"
import { MessageManager } from "../message-manager/message-manager"
import { MongooseConnect } from '../../services/mongoose-connect/mongoose-connect.service'

export class Hellforge {
  private static _instance: Hellforge
  private _client = new Client()

  public static getInstance(): Hellforge {
    if(_.isNil(Hellforge._instance)) {
      Hellforge._instance = new Hellforge()
    }
    return Hellforge._instance
  }

  public init(): void {
    MongooseConnect.getInstance().init()

    this._client.on('ready', (): void => {
      Ready.getInstance().setActivity(this._client.user, "WATCHING")
      Ready.getInstance().log(this._client.user?.tag)
    })

    MessageManager.getInstance().messageEvent(this._client)

    this._client.login(token)
  }
}

Hellforge.getInstance().init()
