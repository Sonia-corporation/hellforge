import _ from "lodash"
import { TextFormats } from '../../enums/text-format.enum'
import { BoldererService } from './bolderer/bolderer.service'

export class MessageFormattingService {
  private static _instance: MessageFormattingService

  public static getInstance(): MessageFormattingService {
    if (_.isNil(MessageFormattingService._instance)) {
      MessageFormattingService._instance = new MessageFormattingService()
    }
    return MessageFormattingService._instance
  }

  public format(formatToApply: string, text: string) {
    switch (formatToApply) {
      case TextFormats.BOLD: {
        text = BoldererService.getInstance().bold(text)
        break
      }
      case TextFormats.ITALIC: {
        break
      }
      case TextFormats.ITALIC_BOLD: {
        break
      }
      case TextFormats.LINE_THROUGH: {
        break
      }
      case TextFormats.STRIKE: {
        break
      }
      case TextFormats.UNDERLINE: {
        break
      }
    }
    return text
  }
}
