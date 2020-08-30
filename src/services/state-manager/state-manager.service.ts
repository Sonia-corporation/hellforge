import _ from "lodash";
import mongoose, { Document } from "mongoose";
import { IState } from "../../types/global/state";
import States from "../../data/models/state-schema";

export class StateManagerService {
  private static _instance: StateManagerService;

  public static getInstance(): StateManagerService {
    if (_.isNil(StateManagerService._instance)) {
      StateManagerService._instance = new StateManagerService();
    }
    return StateManagerService._instance;
  }

  public async getBotState(memberId: string): Promise<IState | void> {
    return States.findOne({ memberId }).then(
      (foundState: mongoose.Document | null): Promise<IState | void> => {
        if (this._isState(foundState)) {
          return Promise.resolve(foundState);
        }

        return Promise.reject(
          Error(
            `Couldn't find the state with the provided member id: ${memberId}`
          )
        );
      }
    );
  }

  public async setBotState(
    memberId: string,
    newState: IState
  ): Promise<Document | void> {
    const currentStateForMemberId = await this.getBotState(memberId);

    if (currentStateForMemberId) {
      return States.update({ memberId }, newState);
    }

    return States.create(newState);
  }

  private _isState(state: unknown): state is IState {
    return (state as IState) !== null;
  }
}
