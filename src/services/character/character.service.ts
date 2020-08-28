import _ from "lodash";
import mongoose from "mongoose";
import { ICharacter } from "../../types/character/character";

export class CharacterService {
  private static _instance: CharacterService;

  public static getInstance(): CharacterService {
    if (_.isNil(CharacterService._instance)) {
      CharacterService._instance = new CharacterService();
    }
    return CharacterService._instance;
  }

  public getEntity(ownerId: string): Promise<ICharacter | never> {
    return new Promise((resolve, reject): void => {
      void mongoose
        .model(`characterSchema`)
        .findOne({ ownerId })
        .then((foundCharacter: mongoose.Document | null): void => {
          if (this._isEntity(foundCharacter)) {
            console.log(`Character found with name: ${foundCharacter.name}`);

            resolve(foundCharacter);
          } else {
            reject(
              Error(`Couldn't find it with the provided owner: ${ownerId}`)
            );
          }
        });
    });
  }

  public setEntity(ownerId: string, characterToInsert: ICharacter): void {
    mongoose
      .model(`characterSchema`)
      .update({ ownerId }, characterToInsert)
      .then((): void => {
        console.info(`A user created their character`);
      })
      .catch((err: string): void => {
        console.error(`An error occured while creating the character: ${err}`);
      });
  }

  private _isEntity(entity: unknown): entity is ICharacter {
    return (entity as ICharacter) !== null;
  }
}
