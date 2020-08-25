import _ from "lodash"
import { IState } from '../../types/global/state'
import { StateNamesEnum } from 'src/enums/state-names.enum'

export class StateManagerService {
  private static _instance: StateManagerService
  private _currentBotState: StateNamesEnum = StateNamesEnum.NORMAL
  private _currentBotStep: number = 0
  private _currentData: string = ''

  public static getInstance() {
    if (_.isNil(StateManagerService._instance)) {
      StateManagerService._instance = new StateManagerService()
    }
    return StateManagerService._instance
  }

  public getBotState(): IState {
    return {
      state: this._currentBotState,
      step: this._currentBotStep,
      data: this._currentData
    }
  }

  public setBotState(stateName: StateNamesEnum, step: number, data?: string) : void{
    this._currentBotState = stateName
    this._currentBotStep = step
    if (data) this._currentData = data
  }
}