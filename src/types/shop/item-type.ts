import { Effect } from '../skills/effect-type'

export type Item = {
  name: string,
  description: string,
  effects: Effect[]
}
