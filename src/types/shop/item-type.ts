import { IEffect } from '../skills/effect-type'

export interface IItem {
  name: string,
  description: string,
  effects: IEffect[]
}
