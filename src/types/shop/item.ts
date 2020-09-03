import { IEffect } from "../skill/effect";
import { ObjectTypesEnum } from "../../enums/object-types.enum";

export interface IItem {
  description: string;
  effects?: IEffect[];
  name: string;
  type: ObjectTypesEnum;
}
