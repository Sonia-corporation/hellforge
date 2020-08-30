import { Document } from "mongoose";
import { IStat } from "./stat";
import { IItem } from "../shop/item";
import { IEquipment } from "../shop/equipment";
import { IWeapon } from "../shop/weapon";
import { IBehaviour } from "./behaviour";
import { SmithTypesEnum } from "../../enums/smith-types.enum";

export interface ISmith extends Document {
  behaviour: IBehaviour;
  description: string;
  equipment?: IEquipment[];
  name: string;
  objects?: IItem[];
  startingLevel: number;
  stats: IStat[];
  type: SmithTypesEnum;
  weapons?: IWeapon[];
}
