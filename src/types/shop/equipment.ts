import { IItem } from "./item";
import { EquipmentSpotsEnum } from "../../enums/equipment-spots.enum";

export interface IEquipment extends IItem {
  spot: EquipmentSpotsEnum;
}
