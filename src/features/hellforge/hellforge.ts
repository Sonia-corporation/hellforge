import _ from "lodash"
import * as Discord from "discord.js"
import { AppReadyServivce } from "../ready/app-ready.service"

class Hellforge {
  private _client = new Discord.Client()

  constructor() {
    AppReadyServivce.getInstance().init(this._client)
  }
}

new Hellforge()
