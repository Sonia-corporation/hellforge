import _ from 'lodash'
import { Message } from 'discord.js'
import { CharacterService } from '../../../services/character/character.service'
import { MessageManagerService } from '../../../services/message-manager/message-manager.service'

export class CharacterCommand {
  private static _instance: CharacterCommand

  public static getInstance(): CharacterCommand {
    if(_.isNil(CharacterCommand._instance)) {
      CharacterCommand._instance = new CharacterCommand()
    }
    return CharacterCommand._instance
  }

  public displayCharacterMessage(message: Message) {
    CharacterService.getInstance().getCharacter(message.author.id)
    .then((characterFound) => {
      MessageManagerService.getInstance().displayMessage(message, `Your character's name is: ${characterFound.name}`)
    })
    .catch(() => {
      MessageManagerService.getInstance().displayMessage(message, `Character not found.`)
    })
  }
}
