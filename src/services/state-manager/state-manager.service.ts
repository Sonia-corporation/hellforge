import _ from "lodash"
import { IState } from '../../types/global/state'
import { StateNamesEnum } from '../../enums/state-names.enum'

export class StateManagerService {
  private static _instance: StateManagerService
  private _currentBotState: IState = {
    memberId: '',
    state: StateNamesEnum.NORMAL,
    step: 0,
    data: ''
  }

  public static getInstance() {
    if (_.isNil(StateManagerService._instance)) {
      StateManagerService._instance = new StateManagerService()
    }
    return StateManagerService._instance
  }

  public getBotState(): IState {
    return this._currentBotState
  }

  public setBotState(newState: IState): void{
    this._currentBotState.memberId = newState.memberId
    this._currentBotState.state = newState.state
    this._currentBotState.step = newState.step
    this._currentBotState.data = newState.data
  }
}
