import { StateNamesEnum } from '../../enums/state-names.enum';

export interface IState {
  state: StateNamesEnum,
  step: number
  data: string
}
