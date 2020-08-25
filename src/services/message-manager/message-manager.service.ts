import _ from 'lodash'
import { Message, Client } from 'discord.js'
import { PrefixManagerService } from '../prefix-manager/prefix-manager.service';

import { CharacterCommandService } from "../../features/commands/character/character-command.service";

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

        const args = message.content.slice(prefix.length).split(/ +/)
        const command = args.shift()

        if (!command) return this.displayMessage(message, 'Yes?')

        if (command.toLowerCase() === 'character') {
          CharacterCommandService.getInstance().message(message)
        }
        else this.displayMessage(message, ':smiling_imp:')

        return message.channel.stopTyping(true)
      }
    }
  }

  public displayMessage(messageToAnswer: Message, messageToSend: string): void {
    messageToAnswer.channel.send(messageToSend)
  }
}
