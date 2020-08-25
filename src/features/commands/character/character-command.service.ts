import _ from 'lodash'
import { Message } from 'discord.js'
import { CharacterService } from '../../../services/character/character.service'
import { MessageManagerService } from '../../../services/message-manager/message-manager.service'

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
      MessageManagerService.getInstance().displayMessage(message, `Your character's name is: ${characterFound.name}`)
    })
    .catch(() => {
      MessageManagerService.getInstance().displayMessage(message, `Character not found.`)
    })
  }
}
