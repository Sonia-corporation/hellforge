import { IEffect } from "../skills/effect";

export interface IItem {
  description: string;
  effects: IEffect[];
  name: string;
}
