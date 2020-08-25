import _ from "lodash"

export class StateManagerService {
  private static _instance: StateManagerService
  private _currentBotState: string = 'Normal'
  private _currentBotStep: number = 0
  private _optionalData?: string = undefined

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
      data: this._optionalData
    }
  }

  public setBotState(stateName: string, step: number, optionaldata?: string) {
    this._currentBotState = stateName
    this._currentBotStep = step
    if (optionaldata) this._optionalData = optionaldata
  }
}