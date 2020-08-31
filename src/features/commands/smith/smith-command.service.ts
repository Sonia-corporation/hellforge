import _ from "lodash";
import { Smith } from "../../../classes/smith/smith";
import names from "../../../data/texts/smiths/names.json";
import { ISmith } from "../../../types/character/smith";
import { IStat } from "../../../types/character/stat";
import { IWeapon } from "../../../types/shop/weapon";
import { IBehaviour } from "../../../types/character/behaviour";
import { SmithTypesEnum } from "../../../enums/smith-types.enum";
import { StatNamesEnum } from "../../../enums/stat-names.enum";
import { SmithBehaviourEnum } from "../../../enums/smith-behaviour";
import { ObjectTypesEnum } from "../../../enums/object-types.enum";
import { EquipmentSpotsEnum } from "../../../enums/equipment-spots.enum";
import { WeaponCategoriesEnum } from "../../../enums/weapon-categories.enum";
import Smiths from "../../../data/models/smith-schema";

export class SmithCommandService {
  private static _instance: SmithCommandService;

  public static getInstance(): SmithCommandService {
    if (_.isNil(SmithCommandService._instance)) {
      SmithCommandService._instance = new SmithCommandService();
    }
    return SmithCommandService._instance;
  }

  public async generate(): Promise<ISmith> {
    const behaviour = this._generateBehaviour();
    const description = ``;
    const name = this._generateName();
    const startingLevel = _.random(1, 10);
    const stats = this._generateStats();
    const type = this._generateType();
    const weapons = this._generateWeapons(_.random(1, 3));

    const smith: ISmith = new Smith({
      behaviour,
      description,
      name,
      startingLevel,
      stats,
      type,
      weapons,
    });

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
    const name = _.sample(names);

    if (name) {
      return name[0];
    }
    return `Bob`;
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
