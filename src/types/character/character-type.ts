import { Stat } from './stat'
import { Item } from '../shop/item'
import { Effect } from '../skills/effects'

export type CharacterType = {
  ownerId: string,
  name: string,
  gender: string,
  level: number,
  experience: number,
  credits: number,
  stats: Stat[],
  inventorySpace: number,
  inventoryMax: number,
  inventory: Item[],
  ailments: Effect[]
}
