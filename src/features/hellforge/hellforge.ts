import _ from "lodash"
import { Client } from "discord.js"
import { AppReadyServivce } from "../../services/app-ready/app-ready.service"
import { MessageManagerService } from "../../services/message-manager/message-manager.service"

class Hellforge {
  private _client = new Client();

  constructor() {
    AppReadyServivce.getInstance().init(this._client)
    MessageManagerService.getInstance().messageEvent(this._client)
  }
}

new Hellforge()
