import { Stat } from './stat-type'
import { Item } from '../shop/item-type'
import { Effect } from '../skills/effect-type'

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
