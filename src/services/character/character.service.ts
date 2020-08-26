import _ from "lodash";
import { Document } from 'mongoose';
import { ICharacter } from "../../types/character/character";
import characterSchema from "../../data/models/character-schema";

export class CharacterService {
  private static _instance: CharacterService;

  public static getInstance(): CharacterService {
    if (_.isNil(CharacterService._instance)) {
      CharacterService._instance = new CharacterService();
    }
    return CharacterService._instance;
  }

  public getEntity(_ownerId: string): void {
    // @todo fix it
    // return await characterSchema
    //   .findOne(
    //     { ownerId },
    //     (_err: Error, _characterFound: Document): ICharacter | null => {
    //       // @todo fix it
    //       // if (characterFound) return characterFound.schema.obj;
    //       return null;
    //     },
    //   )
    //   .catch((err): void => {
    //     console.log(`Error: Character not found because: ${err}`);
    //   });
  }

  public setEntity(_ownerId: string, _characterToInsert: ICharacter): void {
    characterSchema
      .update({ ownerId: _ownerId }, _characterToInsert)
      .then((): void => {
        console.info(`A user created their character`);
      })
      .catch((err: string): void => {
        console.error(`An error occured: ${err}`);
      });
  }
}
