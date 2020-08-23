import _ from 'lodash'
import { Message } from 'discord.js'
import { CharacterService } from '../../../services/character/character.service'
import { MessageManager } from '../../message-manager/message-manager'

export class CharacterCommand {
  private static _instance: CharacterCommand

  public static getInstance(): CharacterCommand {
    if(_.isNil(CharacterCommand._instance)) {
      CharacterCommand._instance = new CharacterCommand()
    }
    return CharacterCommand._instance
  }

  public  checkCharacter(authorId: string) {
    return CharacterService.getInstance().getCharacter(authorId).then(character => {
      if (character) return character

      return Promise.reject(new Error('Character not found.'))
    })
  }

  public async displayCharacterMessage(message: Message) {
    let characterCommandAnswer = await this.checkCharacter(message.author.id)

    if (characterCommandAnswer) MessageManager.getInstance().displayMessage(message, `Your character's name is: ${characterCommandAnswer}`)
    else MessageManager.getInstance().displayMessage(message, `Character not found.`)
  }
}
