import _ from "lodash";
import { Document } from "mongoose";
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
import { WeaponCategoriesEnum } from "../../enums/weapons/categories.enum";
import { SmithBehaviourDescriptionEnum } from "../../enums/smith/behaviour-description";
import { SmithBehaviourEnum } from "../../enums/smith/behaviour";
import { SmithNamesEnum } from "../../enums/smith/name";
import { WeaponNamesEnum } from "../../enums/weapons/names.enum";
import Smiths from "../../data/models/smith-schema";

export class Smith extends Document implements ISmith {
  public behaviour: IBehaviour;
  public description: string;
  public equipment?: IEquipment[];
  public name: string;
  public items?: IItem[];
  public startingLevel: number;
  public stats: IStat[];
  public type: SmithTypesEnum;
  public weapons?: IWeapon[];

  public constructor() {
    super();
    this.behaviour = this._generateBehaviour();
    this.description = this._generateDescription();
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
    return _.reduce(
      StatNamesEnum,
      (generatedStats: IStat[], statName: StatNamesEnum): IStat[] => {
        const generatedStat = {
          description: `Stat description`,
          name: statName,
          value: _.random(4, 11),
        };

        if (statName === StatNamesEnum.LUCK) {
          generatedStat.value = _.random(0, 5);
        }

        return _.concat(generatedStats, generatedStat);
      },
      []
    );
  }

  private _generateType(): SmithTypesEnum {
    return _.sample(SmithTypesEnum) || SmithTypesEnum.BLACKSMITH;
  }

  private _generateWeapons(weaponsNumber: number): IWeapon[] | undefined {
    const weapons: IWeapon[] = [];
    _.times(weaponsNumber, (_index): void => {
      weapons.push({
        category: WeaponCategoriesEnum.BOW,
        description: `Weapon description`,
        name: _.sample(WeaponNamesEnum) || WeaponNamesEnum.RUSTY_SWORD,
        spot: EquipmentSpotsEnum.PRIMARY_HAND,
        type: ObjectTypesEnum.EQUIPMENT,
      });
    });

    return weapons;
  }
}
