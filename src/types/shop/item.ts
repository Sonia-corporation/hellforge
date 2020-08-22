import { Effect } from '../skills/effects'

export type Item = {
  name: string,
  description: string,
  effects: Effect[]
}
