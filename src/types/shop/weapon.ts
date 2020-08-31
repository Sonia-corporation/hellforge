import { IEquipment } from "./equipment";
import { WeaponCategoriesEnum } from "../../enums/weapons/categories.enum";

export interface IWeapon extends IEquipment {
  category: WeaponCategoriesEnum;
}
