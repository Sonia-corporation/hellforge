import { IStat } from './stat-type'
import { IItem } from '../shop/item-type'
import { IEffect } from '../skills/effect-type'

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
