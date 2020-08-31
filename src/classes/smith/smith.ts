import { IBehaviour } from "../../types/character/behaviour";
import { IEquipment } from "../../types/shop/equipment";
import { IItem } from "../../types/shop/item";
import { ISmith } from "../../types/character/smith";
import { IStat } from "../../types/character/stat";
import { IWeapon } from "../../types/shop/weapon";
import { SmithTypesEnum } from "../../enums/smith-types.enum";

export class Smith implements ISmith {
  public behaviour: IBehaviour;
  public description: string;
  public equipment?: IEquipment[];
  public name: string;
  public items?: IItem[];
  public startingLevel: number;
  public stats: IStat[];
  public type: SmithTypesEnum;
  public weapons?: IWeapon[];

  constructor(smith: ISmith) {
    this.behaviour = smith.behaviour;
    this.description = smith.description;
    if (smith.equipment) {
      this.equipment = smith.equipment;
    }
    this.name = smith.name;
    if (smith.items) {
      this.items = smith.items;
    }
    this.startingLevel = smith.startingLevel;
    this.stats = smith.stats;
    this.type = smith.type;
    if (smith.weapons) {
      this.weapons = smith.weapons;
    }
  }
}
