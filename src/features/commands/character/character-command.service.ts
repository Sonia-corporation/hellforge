import _ from 'lodash'
import { Message } from 'discord.js'
import { CharacterService } from '../../../services/character/character.service'
import { DisplayMessageService } from '../../../services/display-message/display-message.service'
import { MessageFormattingBoldererService } from '../../../services/message-formating/bolderer/message-formatting-bolderer.service'

export class CharacterCommandService {
  private static _instance: CharacterCommandService

  public static getInstance(): CharacterCommandService {
    if(_.isNil(CharacterCommandService._instance)) {
      CharacterCommandService._instance = new CharacterCommandService()
    }
    return CharacterCommandService._instance
  }

  public message(message: Message): void {
    CharacterService.getInstance().getEntity(message.author.id)
    .then((characterFound) => {
      const boldCharacterName = MessageFormattingBoldererService.getInstance().bold(characterFound.name)
      DisplayMessageService.getInstance().displayMessage(message, `Your character's name is: ${boldCharacterName}`)
    })
    .catch(() => {
      DisplayMessageService.getInstance().displayMessage(message, `Character not found.`)
    })
  }
}
