import _ from "lodash";
import { IBehaviour } from "../../types/character/behaviour";
import { IEquipment } from "../../types/shop/equipment";
import { IItem } from "../../types/shop/item";
import { ISmith } from "../../types/character/smith";
import { IStat } from "../../types/character/stat";
import { IWeapon } from "../../types/shop/weapon";
import { SmithTypesEnum } from "../../enums/smith/types.enum";
import { EquipmentSpotsEnum } from "../../enums/equipment-spots.enum";
import { ObjectTypesEnum } from "../../enums/object-types.enum";
import { StatNamesEnum } from "../../enums/stat-names.enum";
import { SmithBehaviourNameEnum } from "../../enums/smith/behaviour-name";
import { WeaponCategoriesEnum } from "../../enums/weapon-categories.enum";
import { SmithBehaviourDescriptionEnum } from "../../enums/smith/behaviour-description";
import { SmithBehaviourEnum } from "../../enums/smith/behaviour";
import Smiths from "../../data/models/smith-schema";
import { SmithNamesEnum } from 'src/enums/smith/name';

export class Smith implements ISmith {
  public behaviour: IBehaviour = this._generateBehaviour();
  public description: string = this._generateDescription();
  public equipment?: IEquipment[];
  public name: string = this._generateName();
  public items?: IItem[];
  public startingLevel: number = this._generateStartingLevel(10);
  public stats: IStat[] = this._generateStats();
  public type: SmithTypesEnum = this._generateType();
  public weapons?: IWeapon[] = this._generateWeapons(_.random(1, 3));

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

    return Smiths.create(smith);
  }

  private _generateBehaviour(): IBehaviour {
    const smithBehaviour =
      _.sample(SmithBehaviourEnum) || SmithBehaviourEnum.SHY;

    return {
      description: SmithBehaviourDescriptionEnum[smithBehaviour],
      name: SmithBehaviourNameEnum[smithBehaviour],
    };
  }

  private _generateDescription(): string {
    return `Description`;
  }

  private _generateName(): string {
    return _.sample(SmithNamesEnum) || SmithNamesEnum.BOB;
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
    return _.sample(SmithTypesEnum) || SmithTypesEnum.BLACKSMITH;
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
