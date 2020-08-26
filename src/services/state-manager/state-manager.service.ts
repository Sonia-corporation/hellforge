import _ from "lodash";
import { Document } from "mongoose";
import { IState } from "../../types/global/state";

export class StateManagerService {
  private static _instance: StateManagerService;

  public static getInstance(): StateManagerService {
    if (_.isNil(StateManagerService._instance)) {
      StateManagerService._instance = new StateManagerService();
    }
    return StateManagerService._instance;
  }

  public async getBotState(_memberId: string): Promise<Document | void> {
    // @todo fix it
    // return await stateSchema
    //   .findOne(
    //     { memberId },
    //     (_err: Error, stateFound: Document): IState | null => {
    //       if (stateFound) {
    //         return stateFound.schema.obj;
    //       }
    //
    //       // @todo check if this is a good return type
    //       return null;
    //     }
    //   )
    //   .catch((err): void => {
    //     console.log(`Error: State not found because: ${err}`);
    //   });
  }

  public setBotState(_memberId: string, _newState: IState): void {
    // @todo fix it
    // this.getBotState(memberId).then((stateFound): void => {
    //   if (stateFound) {
    //     stateSchema.update({ memberId }, newState, (err: Error) => {
    //       if (err) {
    //         throw err;
    //       }
    //     });
    //   } else {
    //     stateSchema.create(newState);
    //   }
    // });
  }
}
