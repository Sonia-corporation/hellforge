import { IEquipment } from "./equipment";
import { WeaponCategoriesEnum } from "../../enums/weapon-categories.enum";

export interface IWeapon extends IEquipment {
  category: WeaponCategoriesEnum;
}
