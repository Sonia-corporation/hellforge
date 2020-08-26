import _ from "lodash";
import { ICharacter } from "../../types/character/character";

export class CharacterService {
  private static _instance: CharacterService;

  public static getInstance(): CharacterService {
    if (_.isNil(CharacterService._instance)) {
      CharacterService._instance = new CharacterService();
    }
    return CharacterService._instance;
  }

  public async getEntity(_ownerId: string): Promise<Document | void> {
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
    // @todo fix it
    // characterSchema.update({ ownerId }, characterToInsert, (err: Error): void => {
    //   if (err) throw err;
    // });
  }
}
