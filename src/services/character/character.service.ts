import _ from 'lodash'
import { Query, Document } from 'mongoose'
import characters from '../../data/models/character-schema'
import { ICharacter } from '../../types/character/character'

export class CharacterService {
  private static _instance: CharacterService

  public static getInstance(): CharacterService {
    if(_.isNil(CharacterService._instance)) {
      CharacterService._instance = new CharacterService()
    }
    return CharacterService._instance
  }

  public async getEntity(id: string):Promise<Document | null> {
    return await characters.findOne({ ownerId: id }, (err: Error, characterFound) => {        
      if (characterFound) return characterFound
      else throw err
    })
  }

  public setEntity(id: string, characterToInsert: ICharacter): void {
    characters.update({ ownerId: id }, characterToInsert, (err: Error): void => {
      if (err) throw err
    })
  }
}
