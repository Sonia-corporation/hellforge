import { StateNamesEnum } from '../../enums/state-names.enum';

export interface IState {
  memberId: string,
  state: StateNamesEnum,
  step: number,
  data: string
}
