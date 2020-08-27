import _ from "lodash";
import { Document } from "mongoose";
import { IState } from "../../types/global/state";
import stateSchema from "../../data/models/state-schema";
import { StateNamesEnum } from "../../enums/state-names.enum";

export class StateManagerService {
  private static _instance: StateManagerService;
  private _currentState: IState = {
    memberId: 'None',
    state: {
      data: '',
      name: StateNamesEnum.NORMAL,
      step: 0,
    }
  };

  public static getInstance(): StateManagerService {
    if (_.isNil(StateManagerService._instance)) {
      StateManagerService._instance = new StateManagerService();
    }
    return StateManagerService._instance;
  }

  private _isState(_state: unknown): _state is IState {
    return (_state as IState) !== null
  }

  public async getBotState(_memberId: string): Promise<IState> {
    return new Promise((resolve, reject): void => {
      stateSchema.findOne(
        { memberId: _memberId }
      )
      .then((foundState: Document | null): void => {
        if (this._isState(foundState)) {
          console.log(`Character found with name: ${foundState.state.name}`);
          resolve(foundState);
        }
        else {
          reject(Error(`Couldn't find the character with the provided member id: ${_memberId}`))
        }
      })
    });
  }

  public setBotState(_memberId: string, _newState: IState): void {
    if (this._currentState.memberId === _memberId) {
      stateSchema.update({ memberId: _memberId }, _newState);
    }
    else {
      stateSchema.create(_newState);
    }
  }
}
