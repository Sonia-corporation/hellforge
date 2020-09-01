import { StatNamesEnum } from "../../enums/stat-names.enum";

export interface IStat {
  description: string;
  name: StatNamesEnum;
  value: number;
}
