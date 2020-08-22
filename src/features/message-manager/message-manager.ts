import _ from 'lodash'
import { Message } from 'discord.js'
import { prefixes } from "../prefix.json"

import { Character } from "../commands/character/character";

export class MessageManager {
  private static _instance: MessageManager

  public static getInstance(): MessageManager {
    if(_.isNil(MessageManager._instance)) {
      MessageManager._instance = new MessageManager()
    }
    return MessageManager._instance
  }

  public async manageMessage(message: Message): Promise<void> {
    if (message.guild) {
      if (message.author.bot) return

      for (const prefix of prefixes) {
        if (message.content.startsWith(prefix)) {
          const args = message.content.slice(prefix.length).split(/ +/)
          const command = args.shift()

          if (!command) return

          if (command.toLowerCase() === 'character') {
            const characterCommandAnswer = await Promise
            .resolve(Character.getInstance().checkCharacter(message.author.id))
            .catch(() => { return 'Character not found' })

            this.displayMessage(message, characterCommandAnswer?.toString() || 'Character not found')
          }
          else this.displayMessage(message, ':smiling_imp:')
        }
        return
      }
    }
  }

  public displayMessage(messageToAnswer: Message, messageToSend: string) {
    messageToAnswer.channel.send(messageToSend)
  }
}
