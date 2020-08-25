import _ from "lodash"

export class MessageFormattingBoldererService {
  private static _instance: MessageFormattingBoldererService

  public static getInstance(): MessageFormattingBoldererService {
    if (_.isNil(MessageFormattingBoldererService._instance)) {
      MessageFormattingBoldererService._instance = new MessageFormattingBoldererService()
    }
    return MessageFormattingBoldererService._instance
  }

  public makeItBold(text: string) {
    return `**${text}**`
  }
}