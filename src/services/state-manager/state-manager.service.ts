import _ from "lodash"

export class StateManagerService {
  private static _instance: StateManagerService
  private _currentBotState: string = 'Normal'
  private _currentBotStep: number = 0
  private _currentData: string = ''

  public static getInstance() {
    if (_.isNil(StateManagerService._instance)) {
      StateManagerService._instance = new StateManagerService()
    }
    return StateManagerService._instance
  }

  public getBotState() {
    return {
      state: this._currentBotState,
      step: this._currentBotStep,
      data: this._currentData
    }
  }

  public setBotState(stateName: string, step: number, data?: string) {
    this._currentBotState = stateName
    this._currentBotStep = step
    if (data) this._currentData = data
  }
}