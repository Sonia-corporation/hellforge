import { IEffect } from "./effect";

export interface ISkill {
  description: string;
  effects: IEffect[];
  name: string;
}
