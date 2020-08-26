import { StateNamesEnum } from "../../enums/state-names.enum";

export interface IState {
  memberId: string;
  state: {
    data: string;
    name: StateNamesEnum;
    step: number;
  };
}
