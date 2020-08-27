import _ from "lodash";
import { Document } from "mongoose";
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

  private _isEntity(_entity: unknown): _entity is ICharacter {
    return (_entity as ICharacter) !== null
  }

  public getEntity(_ownerId: string): Promise<ICharacter | never> {
    return new Promise((resolve, reject): void => {
      characterSchema
        .findOne(
          { ownerId: _ownerId }
        )
        .then((foundCharacter: Document | null): void => {
          if (this._isEntity(foundCharacter)) {
            console.log(`Character found with name: ${foundCharacter.name}`);

            resolve(foundCharacter);
          }
          else {
            reject(Error(`Couldn't find it with the provided owner: ${_ownerId}`))
          }
        })
    });
  }

  public setEntity(_ownerId: string, _characterToInsert: ICharacter): void {
    characterSchema
      .update({ ownerId: _ownerId }, _characterToInsert)
      .then((): void => {
        console.info(`A user created their character`);
      })
      .catch((_err: string): void => {
        console.error(`An error occured while creating the character: ${_err}`);
      });
  }
}
