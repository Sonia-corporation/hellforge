import _ from 'lodash'
import { Message, Client } from 'discord.js'
import { PrefixesEnum } from "../../features/prefixes"

import { CharacterCommand } from "../../features/commands/character/character-command";

export class MessageManagerService {
  private static _instance: MessageManagerService

  public static getInstance(): MessageManagerService {
    if(_.isNil(MessageManagerService._instance)) {
      MessageManagerService._instance = new MessageManagerService()
    }
    return MessageManagerService._instance
  }

  public messageEvent(client: Client) {
    client.on('message', (msg: Message) => {
      this._manageMessage(msg)
    })
  }

  private _manageMessage(message: Message) {
    if (message.guild) {
      if (message.author.bot) return
      
      for (const prefix of Object.values(PrefixesEnum)) {
        if (message.content.startsWith(prefix)) {
          message.channel.startTyping()

          const args = message.content.slice(prefix.length).split(/ +/)
          const command = args.shift()

          if (!command) return

          if (command.toLowerCase() === 'character') {
            CharacterCommand.getInstance().message(message)
          }
          else this.displayMessage(message, ':smiling_imp:')

          message.channel.stopTyping(true)
          return
        }
      }
    }
  }

  public displayMessage(messageToAnswer: Message, messageToSend: string) {
    messageToAnswer.channel.send(messageToSend)
  }
}
