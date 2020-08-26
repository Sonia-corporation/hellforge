import _ from "lodash"
import { Document } from "mongoose"
import { ICharacter } from "../../types/character/character"
import characters from "../../data/models/character-schema"

export class CharacterService {
  private static _instance: CharacterService

  public static getInstance(): CharacterService {
    if (_.isNil(CharacterService._instance)) {
      CharacterService._instance = new CharacterService()
    }
    return CharacterService._instance
  }

  public async getEntity(ownerId: string):Promise<Document | void> {
    return await characters.findOne({ ownerId }, (err: Error, characterFound: Document): ICharacter => {
      if (characterFound) return characterFound.schema.obj
    })
      .catch((err): void => {
        console.log(`Error: Character not found because: ${err}`)
      })
  }

  public setEntity(ownerId: string, characterToInsert: ICharacter): void {
    characters.update({ ownerId }, characterToInsert, (err: Error): void => {
      if (err) throw err
    })
  }
}
