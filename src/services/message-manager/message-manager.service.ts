import _ from 'lodash'
import { Message, Client } from 'discord.js'
import { Prefixes } from "../../features/prefixes"

import { CharacterCommand } from "../../features/commands/character/character";

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
      
      for (const prefix in Prefixes) {
        if (message.content.startsWith(Prefixes[prefix])) {
          message.channel.startTyping()

          const args = message.content.slice(Prefixes[prefix].length).split(/ +/)
          const command = args.shift()

          if (!command) return

          if (command.toLowerCase() === 'character') {
            CharacterCommand.getInstance().displayCharacterMessage(message)
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
