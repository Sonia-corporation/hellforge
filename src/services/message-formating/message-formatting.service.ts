import _ from "lodash";
import { TextFormats } from "../../enums/text-formats.enum";

export class MessageFormattingService {
  private static _instance: MessageFormattingService;

  public static getInstance(): MessageFormattingService {
    if (_.isNil(MessageFormattingService._instance)) {
      MessageFormattingService._instance = new MessageFormattingService();
    }
    return MessageFormattingService._instance;
  }

  public format(formatToApply: TextFormats, text: string): string {
    return this[formatToApply](text);
  }

  public bold(text: string): string {
    return `**${text}**`;
  }

  public italic(text: string): string {
    return `*${text}*`;
  }

  public italicBold(text: string): string {
    return `***${text}***`;
  }

  public lineThrough(text: string): string {
    return `~~${text}~~`;
  }

  public underline(text: string): string {
    return `__${text}__`;
  }
}
