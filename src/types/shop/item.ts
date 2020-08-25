import { IEffect } from '../skills/effect'

export interface IItem {
  name: string,
  description: string,
  effects: IEffect[]
}
