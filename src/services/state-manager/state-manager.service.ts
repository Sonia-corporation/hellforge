import _ from "lodash";
import mongoose from "mongoose";
import { IState } from "../../types/global/state";
import { StateNamesEnum } from "../../enums/state-names.enum";

export class StateManagerService {
  private static _instance: StateManagerService;

  public static getInstance(): StateManagerService {
    if (_.isNil(StateManagerService._instance)) {
      StateManagerService._instance = new StateManagerService();
    }
    return StateManagerService._instance;
  }

  private _currentState: IState = {
    memberId: `None`,
    state: {
      data: ``,
      name: StateNamesEnum.NORMAL,
      step: 0,
    },
  };

  public async getBotState(memberId: string): Promise<IState | never> {
    return new Promise((resolve, reject): void => {
      void mongoose
        .model(`stateSchema`)
        .findOne({ memberId })
        .then((foundState: mongoose.Document | null): void => {
          if (this._isState(foundState)) {
            console.log(`Character found with name: ${foundState.state.name}`);
            resolve(foundState);
          } else {
            reject(
              Error(
                `Couldn't find the character with the provided member id: ${memberId}`
              )
            );
          }
        });
    });
  }

  public setBotState(memberId: string, newState: IState): void {
    if (this._currentState.memberId === memberId) {
      void mongoose.model(`stateSchema`).update({ memberId }, newState);
    } else {
      void mongoose.model(`stateSchema`).create(newState);
    }
  }

  private _isState(state: unknown): state is IState {
    return (state as IState) !== null;
  }
}
