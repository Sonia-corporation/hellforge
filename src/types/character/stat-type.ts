import { StatNamesEnum } from '../../enums/stat-names.enum';

export type Stat = {
  name: StatNamesEnum
  description: string,
  value: number
}
