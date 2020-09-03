import { Document } from "mongoose";
import { IState } from "../../types/global/state";
import { StateNamesEnum } from "../../enums/state-names.enum";

export class State extends Document implements IState {
  public memberId: IState["memberId"] = `000000000000000000`;
  public state: IState["state"] = {
    name: StateNamesEnum.NORMAL,
    step: 1,
  };

  public constructor() {
    super();
  }

  public getMemberId(): IState["memberId"] {
    return this.memberId;
  }

  public getState(): IState["state"] {
    return this.state;
  }

  public setState(state: IState): void {
    this.memberId = state.memberId;
    this.state = state.state;
  }
}
