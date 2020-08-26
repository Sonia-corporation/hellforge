import _ from "lodash"
import { Document } from "mongoose"
import { IState } from "../../types/global/state"
import states from "../../data/models/state-schema"

export class StateManagerService {
  private static _instance: StateManagerService

  public static getInstance() {
    if (_.isNil(StateManagerService._instance)) {
      StateManagerService._instance = new StateManagerService()
    }
    return StateManagerService._instance
  }

  public async getBotState(memberId: string): Promise<Document | void> {
    return await states.findOne({ memberId }, (err: Error, stateFound: Document): IState => {
      if (stateFound) return stateFound.schema.obj
    })
    .catch((err): void => {
      console.log(`Error: State not found because: ${err}`)
      return
    })
  }

  public setBotState(memberId: string, newState: IState): void {
    this.getBotState(memberId)
    .then((stateFound): void => {
      if (stateFound) {
        states.update({ memberId }, newState, (err: Error) => {
          if (err) throw err
        })
      }
      else {
        states.create(newState)
      }
    })
  }
}
