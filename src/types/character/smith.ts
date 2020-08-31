import { IStat } from "./stat";
import { IItem } from "../shop/item";
import { IEquipment } from "../shop/equipment";
import { IWeapon } from "../shop/weapon";
import { IBehaviour } from "./behaviour";
import { SmithTypesEnum } from "../../enums/smith-types.enum";

export interface ISmith {
  behaviour: IBehaviour;
  description: string;
  equipment?: IEquipment[];
  items?: IItem[];
  name: string;
  startingLevel: number;
  stats: IStat[];
  type: SmithTypesEnum;
  weapons?: IWeapon[];
}
