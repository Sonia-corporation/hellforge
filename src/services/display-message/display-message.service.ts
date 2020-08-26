import _ from "lodash"
import { Message } from "discord.js"

export class DisplayMessageService {
  private static _instance: DisplayMessageService

  public static getInstance(): DisplayMessageService {
    if (_.isNil(DisplayMessageService._instance)) {
      DisplayMessageService._instance = new DisplayMessageService()
    }
    return DisplayMessageService._instance
  }

  public message(messageToAnswer: Message, messageToSend: string): void {
    messageToAnswer.channel.send(messageToSend)
  }
}
