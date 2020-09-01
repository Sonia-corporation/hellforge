import _ from "lodash";
import { Message } from "discord.js";
import { CommandsEnum } from "../../enums/commands.enum";

export class ArgumentsManagerService {
  private static _instance: ArgumentsManagerService;

  public static getInstance(): ArgumentsManagerService {
    if (_.isNil(ArgumentsManagerService._instance)) {
      ArgumentsManagerService._instance = new ArgumentsManagerService();
    }
    return ArgumentsManagerService._instance;
  }

  public getArguments(message: Message, botPrefix: string): string[] {
    return message.content.slice(botPrefix.length).split(/ +/);
  }

  public extractCommand(entries: string[]): string | CommandsEnum.NONE {
    const usableBotCommand = entries.shift();

    if (usableBotCommand) {
      return usableBotCommand.toLowerCase();
    }

    return CommandsEnum.NONE;
  }
}
