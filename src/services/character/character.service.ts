import _ from "lodash";
import { Document } from "mongoose";
import { ICharacter } from "../../types/character/character";
import Characters from "../../data/models/character-schema";

export class CharacterService {
  private static _instance: CharacterService;

  public static getInstance(): CharacterService {
    if (_.isNil(CharacterService._instance)) {
      CharacterService._instance = new CharacterService();
    }
    return CharacterService._instance;
  }

  public getEntity(ownerId: string): Promise<ICharacter | void> {
    return Characters.findOne({ ownerId }).then(
      (foundCharacter: Document | null): Promise<ICharacter> => {
        if (this._isEntity(foundCharacter)) {
          return Promise.resolve(foundCharacter);
        }

        return Promise.reject(
          Error(`Couldn't find it with the provided owner: ${ownerId}`)
        );
      }
    );
  }

  public setEntity(
    ownerId: string,
    characterToInsert: ICharacter
  ): Promise<Document | void> {
    return Characters.update({ ownerId }, characterToInsert)
      .then(
        (updatedCharacter: Document): Promise<Document> =>
          Promise.resolve(updatedCharacter)
      )
      .catch((err: string): void => {
        console.error(`An error occured while updating the character: ${err}`);
      });
  }

  private _isEntity(entity: unknown): entity is ICharacter {
    return (entity as ICharacter) !== null;
  }
}
