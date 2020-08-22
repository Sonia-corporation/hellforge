import _ from 'lodash'
import { Message } from 'discord.js'

import { prefixes } from "../prefix.json";

export class MessageManager {
  private static _instance: MessageManager

  public static getInstance(): MessageManager {
    if(_.isNil(MessageManager._instance)) {
      MessageManager._instance = new MessageManager()
    }
    return MessageManager._instance
  }

  public manageMessage(message: Message): void {
    if (message.guild) {
      if (message.author.bot) return

      for (const prefix of prefixes) {
        if (message.content.startsWith(prefix)) {
          this.answerMessage(message)
        }
      }
    }
  }

  public answerMessage(message: Message) {
    message.channel.send(':smiling_imp:')
    return
  }
}
