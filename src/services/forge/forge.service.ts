import _ from "lodash";
import Forges from "../../data/models/forge-schema";
import { IForge } from "../../types/forge/forge";
import { ICharacter } from "../../types/character/character";
import { Document } from "mongoose";

export class ForgeService {
  private static _instance: ForgeService;

  public static getInstance(): ForgeService {
    if (_.isNil(ForgeService._instance)) {
      ForgeService._instance = new ForgeService();
    }
    return ForgeService._instance;
  }

  public getEntity(bossId: ICharacter["ownerId"]): Promise<IForge | void> {
    return Forges.findOne({ bossId }).then(
      (foundForge: Document | null): Promise<IForge> => {
        if (this._isEntity(foundForge)) {
          return Promise.resolve(foundForge);
        }

        return Promise.reject(
          Error(`Couldn't find forge with the boss name: ${bossId}`)
        );
      }
    );
  }

  public setEntity(
    ownerId: string,
    forgeToInsert: IForge
  ): Promise<Document | void> {
    return Forges.update({ ownerId }, forgeToInsert)
      .then(
        (updatedForge: Document): Promise<Document> =>
          Promise.resolve(updatedForge)
      )
      .catch((err: string): void => {
        console.error(`An error occured while updating the forge: ${err}`);
      });
  }

  private _isEntity(entity: unknown): entity is IForge {
    return (entity as IForge) !== null;
  }
}
