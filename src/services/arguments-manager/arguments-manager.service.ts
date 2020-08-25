import _ from "lodash"
import { Message } from "discord.js"
import { DisplayMessageService } from "../display-message/display-message.sevice"

export class ArgumentsManagerService {
  private static _instance: ArgumentsManagerService

  public static getInstance(): ArgumentsManagerService {
    if (_.isNil(ArgumentsManagerService._instance)) {
      ArgumentsManagerService._instance = new ArgumentsManagerService()
    }
    return ArgumentsManagerService._instance
  }

  public getArguments(message: Message, botPrefix: string) {
    return message.content.slice(botPrefix.length).split(/ +/)
  }

  public extractCommand(entries: string[]) {
    const usableBotCommand = entries.shift()
    if (usableBotCommand) return usableBotCommand.toLowerCase()
    return
  }
}
