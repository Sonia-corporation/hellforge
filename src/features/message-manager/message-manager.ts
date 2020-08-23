import _ from 'lodash'
import { Message, Client } from 'discord.js'
import { prefixes } from "../prefix.json"

import { CharacterCommand } from "../commands/character/character";

export class MessageManager {
  private static _instance: MessageManager

  public static getInstance(): MessageManager {
    if(_.isNil(MessageManager._instance)) {
      MessageManager._instance = new MessageManager()
    }
    return MessageManager._instance
  }

  public async messageEvent(client: Client) {
    await client.on('message', async (msg: Message) => {
      await this.manageMessage(msg)
    })
  }

  public async manageMessage(message: Message) {
    if (message.guild) {
      if (message.author.bot) return

      for (const prefix of prefixes) {
        if (message.content.startsWith(prefix)) {
          const args = message.content.slice(prefix.length).split(/ +/)
          const command = args.shift()

          if (!command) return

          if (command.toLowerCase() === 'character') {
            await CharacterCommand.getInstance().displayCharacterMessage(message)
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
