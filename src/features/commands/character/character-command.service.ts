import _ from "lodash"
import { Message } from "discord.js"
import { TextFormats } from "../../../enums/text-formats.enum"
import { CharacterService } from "../../../services/character/character.service"
import { DisplayMessageService } from "../../../services/display-message/display-message.service"
import { MessageFormattingService } from "../../../services/message-formating/message-formatting.service"

export class CharacterCommandService {
  private static _instance: CharacterCommandService

  public static getInstance(): CharacterCommandService {
    if (_.isNil(CharacterCommandService._instance)) {
      CharacterCommandService._instance = new CharacterCommandService()
    }
    return CharacterCommandService._instance
  }

  public message(message: Message): void {
    CharacterService.getInstance().getEntity(message.author.id)
      .then((characterFound) => {
        if (characterFound) {
          const boldCharacterName = MessageFormattingService.getInstance().format(TextFormats.BOLD, characterFound.name)
          DisplayMessageService.getInstance().message(message, `Your character's name is: ${boldCharacterName}`)
        } else {
          DisplayMessageService.getInstance().message(message, "Character not found.")
        }
      })
  }
}
