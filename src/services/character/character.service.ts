import _ from 'lodash'
import character from '../../data/models/character'
import { Query } from 'mongoose'
import { CharacterType } from '../../types/character/character-type'
import { Character } from 'src/features/commands/character/character'

export class CharacterService {
  private static _instance: CharacterService

  public static getInstance(): CharacterService {
    if(_.isNil(CharacterService._instance)) {
      CharacterService._instance = new CharacterService()
    }
    return CharacterService._instance
  }

  public async getCharacter(id: string) {
    return await character.findOne({ ownerId: id }, (err: Error, character: Character) => {
      if (err) throw err
      return character || null
    })
  }

  public setCharacter(id: string, characterToInsert: CharacterType): void {
    character.update({ ownerId: id }, characterToInsert, (err: Error, characterUpdated: any): Query<CharacterType> => {
      if (err) throw err

      return characterUpdated
    })
  }
}
