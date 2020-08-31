import _ from "lodash";
import { IBehaviour } from "../../types/character/behaviour";
import { IEquipment } from "../../types/shop/equipment";
import { IItem } from "../../types/shop/item";
import { ISmith } from "../../types/character/smith";
import { IStat } from "../../types/character/stat";
import { IWeapon } from "../../types/shop/weapon";
import { SmithTypesEnum } from "../../enums/smith-types.enum";
import { EquipmentSpotsEnum } from "../../enums/equipment-spots.enum";
import { ObjectTypesEnum } from "../../enums/object-types.enum";
import { StatNamesEnum } from "../../enums/stat-names.enum";
import { SmithBehaviourEnum } from "../../enums/smith-behaviour";
import { WeaponCategoriesEnum } from "../../enums/weapon-categories.enum";
import Smiths from "../../data/models/smith-schema";
import names from "../../data/texts/smiths/names.json";

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

  constructor() {
    this.behaviour = this._generateBehaviour();
    this.description = ``;
    this.name = this._generateName();
    this.startingLevel = this._generateStartingLevel(10);
    this.stats = this._generateStats();
    this.type = this._generateType();
    this.weapons = this._generateWeapons(_.random(1, 3));
  }

  public async generateEntity(): Promise<ISmith> {
    const smith: ISmith = {
      behaviour: this.behaviour,
      description: this.description,
      name: this.name,
      startingLevel: this.startingLevel,
      stats: this.stats,
      type: this.type,
      weapons: this.weapons,
    };

    void Smiths.create(smith);

    return Promise.resolve(smith);
  }

  private _generateBehaviour(): IBehaviour {
    const behaviour: IBehaviour = {
      description: ``,
      name: _.sample(SmithBehaviourEnum) || SmithBehaviourEnum.SHY,
    };

    return behaviour;
  }

  private _generateName(): string {
    const name = _.sample(names.names);

    if (name) {
      return name;
    }
    return `Bob`;
  }

  private _generateStartingLevel(max: number): number {
    return _.random(1, max);
  }

  private _generateStats(): IStat[] {
    const generatedStats: IStat[] = [];

    _.forEach(StatNamesEnum, (statName: StatNamesEnum): void => {
      if (statName !== StatNamesEnum.LUCK) {
        generatedStats.push({
          description: ``,
          name: statName,
          value: _.random(4, 11),
        });
      } else {
        generatedStats.push({
          description: ``,
          name: StatNamesEnum.LUCK,
          value: _.random(0, 5),
        });
      }
    });

    return generatedStats;
  }

  private _generateType(): SmithTypesEnum {
    const type = _.sample(SmithTypesEnum);

    if (type) {
      return type;
    }

    return SmithTypesEnum.BLACKSMITH;
  }

  private _generateWeapons(weaponsNumber: number): IWeapon[] | undefined {
    const weapons: IWeapon[] = [];

    for (let i = 1; i <= weaponsNumber; i++) {
      weapons.push({
        category: WeaponCategoriesEnum.BOW,
        description: ``,
        name: `Uber Weapon`,
        spot: EquipmentSpotsEnum.PRIMARY_HAND,
        type: ObjectTypesEnum.EQUIPMENT,
      });
    }

    return weapons;
  }
}
