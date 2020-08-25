import { IStat } from './stat'
import { IItem } from '../shop/item'
import { IEffect } from '../skills/effect'

export interface ICharacter {
  ownerId: string,
  name: string,
  gender: string,
  level: number,
  experience: number,
  credits: number,
  stats: IStat[],
  inventorySpace: number,
  inventoryMax: number,
  inventory: IItem[],
  effects: IEffect[]
}
