import _ from 'lodash'
import { Query } from 'mongoose'
import characters from '../../data/models/character-schema'
import { CharacterType } from '../../types/character/character-type'

export class CharacterService {
  private static _instance: CharacterService

  public static getInstance(): CharacterService {
    if(_.isNil(CharacterService._instance)) {
      CharacterService._instance = new CharacterService()
    }
    return CharacterService._instance
  }

  public async getEntity(id: string) {
    return await characters.findOne({ ownerId: id }, (err: Error, characterFound) => {        
      if (characterFound) return characterFound
      else throw err
    })
  }

  public setEntity(id: string, characterToInsert: CharacterType) {
    characters.update({ ownerId: id }, characterToInsert, (err: Error, characterUpdated: any): Query<CharacterType> => {
      if (err) throw err

      return characterUpdated
    })
  }
}
