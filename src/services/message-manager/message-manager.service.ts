import _ from "lodash"
import { Message, Client } from "discord.js"
import { PrefixManagerService } from "../prefix-manager/prefix-manager.service"

import { CharacterCommandService } from "../../features/commands/character/character-command.service"
import { ArgumentsManagerService } from "../arguments-manager/arguments-manager.service"
import { DisplayMessageService } from '../display-message/display-message.service'
import { CharacterCreationService } from '../creation/character/character-creation.service'

export class MessageManagerService {
  private static _instance: MessageManagerService

  public static getInstance(): MessageManagerService {
    if(_.isNil(MessageManagerService._instance)) {
      MessageManagerService._instance = new MessageManagerService()
    }
    return MessageManagerService._instance
  }

  public messageEvent(client: Client): void {
    client.on('message', (msg: Message) => {
      this._manageMessage(msg)
    })
  }

  private _manageMessage(message: Message): void {
    if (message.guild) {
      if (message.author.bot) return

      const prefix: string = PrefixManagerService.getInstance().getReadablePrefix(message.content)

      if (message.content.startsWith(prefix)) {
        message.channel.startTyping(1)

        const args = ArgumentsManagerService.getInstance().getArguments(message, prefix)
        const command = ArgumentsManagerService.getInstance().extractCommand(args)

        if (command === 'character') {
          const createArg = args.find(arg => arg === 'create')

          if (createArg) CharacterCreationService.getInstance().init(message)
          else CharacterCommandService.getInstance().message(message)
        }
        else DisplayMessageService.getInstance().message(message, ':smiling_imp:')

        return message.channel.stopTyping(true)
      }
    }
  }
}
