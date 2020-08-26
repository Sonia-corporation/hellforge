import { StateNamesEnum } from "../../enums/state-names.enum"

export interface IState {
  memberId: string;
  state: {
    name: StateNamesEnum;
    step: number;
    data: string;
  };
}
