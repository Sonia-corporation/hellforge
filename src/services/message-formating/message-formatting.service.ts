import _ from "lodash"

export class MessageFormattingService {
  private static _instance: MessageFormattingService

  public static getInstance(): MessageFormattingService {
    if (_.isNil(MessageFormattingService._instance)) {
      MessageFormattingService._instance = new MessageFormattingService()
    }
    return MessageFormattingService._instance
  }

  public format(formatToApply: string, text: string) {
    return this[formatToApply](text)
  }

  public bold(text: string) {
    return `**${text}**`
  }

  public italic(text: string) {
    return `**${text}**`
  }

  public italicBold(text: string) {
    return `**${text}**`
  }

  public lineThrough(text: string) {
    return `**${text}**`
  }

  public strike(text: string) {
    return `**${text}**`
  }

  public underline(text: string) {
    return `**${text}**`
  }
}
