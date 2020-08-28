import { Document } from "mongoose";
import { StateNamesEnum } from "../../enums/state-names.enum";

export interface IState extends Document {
  memberId: string;
  state: {
    data: string;
    name: StateNamesEnum;
    step: number;
  };
}
