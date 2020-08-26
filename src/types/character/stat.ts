import { StatNamesEnum } from "../../enums/stat-names.enum"

export interface IStat {
  name: StatNamesEnum
  description: string,
  value: number
}
