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

  public async getBotState(_memberId: string): Promise<IState> {
    return new Promise((resolve, reject): void => {
      void mongoose
        .model(`stateSchema`)
        .findOne({ memberId: _memberId })
        .then((foundState: mongoose.Document | null): void => {
          if (this._isState(foundState)) {
            console.log(`Character found with name: ${foundState.state.name}`);
            resolve(foundState);
          } else {
            reject(
              Error(
                `Couldn't find the character with the provided member id: ${_memberId}`
              )
            );
          }
        });
    });
  }

  public setBotState(_memberId: string, _newState: IState): void {
    if (this._currentState.memberId === _memberId) {
      void mongoose
        .model(`stateSchema`)
        .update({ memberId: _memberId }, _newState);
    } else {
      void mongoose.model(`stateSchema`).create(_newState);
    }
  }

  private _isState(_state: unknown): _state is IState {
    return (_state as IState) !== null;
  }
}
