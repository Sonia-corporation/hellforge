import _ from 'lodash'
import { Document } from 'mongoose'
import { CharacterService } from '../../../services/character/character.service'

export class Character {
  private static _instance: Character

  public static getInstance(): Character {
    if(_.isNil(Character._instance)) {
      Character._instance = new Character()
    }
    return Character._instance
  }

  public async checkCharacter(authorId: string): Promise<Document | null> {
    let character = await CharacterService.getInstance().getCharacter(authorId)

    return Promise.resolve(character)
  }
}
