import _ from 'lodash'
import { Query } from 'mongoose'
import character from '../../data/models/character'
import { CharacterType } from '../../types/character/character-type'

export class CharacterService {
  private static _instance: CharacterService

  public static getInstance(): CharacterService {
    if(_.isNil(CharacterService._instance)) {
      CharacterService._instance = new CharacterService()
    }
    return CharacterService._instance
  }

  public getCharacter(id: string) {
    return character.findOne({ ownerId: id }, (err: Error, character) => {
      if (err) throw err

      if (character) return Promise.resolve(character)
      return null
    })
  }

  public setCharacter(id: string, characterToInsert: CharacterType) {
    character.update({ ownerId: id }, characterToInsert, (err: Error, characterUpdated: any): Query<CharacterType> => {
      if (err) throw err

      return characterUpdated
    })
  }
}
