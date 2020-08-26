import { Message } from "discord.js";
import _ from "lodash";

export class ArgumentsManagerService {
  private static _instance: ArgumentsManagerService;

  public static getInstance(): ArgumentsManagerService {
    if (_.isNil(ArgumentsManagerService._instance)) {
      ArgumentsManagerService._instance = new ArgumentsManagerService();
    }
    return ArgumentsManagerService._instance;
  }

  public getArguments(message: Message, botPrefix: string) {
    return message.content.slice(botPrefix.length).split(/ +/);
  }

  // @todo fix return type
  public extractCommand(entries: string[]): unknown {
    const usableBotCommand = entries.shift();

    if (usableBotCommand) {
      return usableBotCommand.toLowerCase();
    }

    // @todo check which return type is necessary
    return null;
  }
}
