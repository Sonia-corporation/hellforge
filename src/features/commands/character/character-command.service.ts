import _ from 'lodash'
import { Message } from 'discord.js'
import { CharacterService } from '../../../services/character/character.service'
import { DisplayMessageService } from '../../../services/display-message/display-message.sevice'

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
      DisplayMessageService.getInstance().displayMessage(message, `Your character's name is: ${characterFound.name}`)
    })
    .catch(() => {
      DisplayMessageService.getInstance().displayMessage(message, `Character not found.`)
    })
  }
}
