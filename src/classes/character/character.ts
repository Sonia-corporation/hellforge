import _ from "lodash";
import { Document } from "mongoose";
import { ICharacter } from "../../types/character/character";
import { IStat } from "../../types/character/stat";
import { IItem } from "../../types/shop/item";
import { IEffect } from "../../types/skill/effect";

export class Character extends Document implements ICharacter {
  public credits: ICharacter["credits"] = 300;
  public effects?: ICharacter["effects"];
  public experience: ICharacter["experience"] = 0;
  public inventory?: ICharacter["inventory"];
  public inventoryMax: ICharacter["inventoryMax"] = 250;
  public inventorySpace: ICharacter["inventorySpace"] = 0;
  public level: ICharacter["level"] = 1;
  public name: ICharacter["name"] = `Character Name`;
  public ownerId: ICharacter["ownerId"] = `000000000000000000`;
  public stats: ICharacter["stats"];

  public constructor() {
    super();
  }

  public getCredits(): ICharacter["credits"] {
    return this.credits;
  }

  public getEffects(): ICharacter["effects"] {
    return this.effects;
  }

  public getExperience(): ICharacter["experience"] {
    return this.experience;
  }

  public getInventory(): ICharacter["inventory"] {
    return this.inventory;
  }

  public getInventoryMax(): ICharacter["inventoryMax"] {
    return this.inventoryMax;
  }

  public getInventorySpace(): ICharacter["inventorySpace"] {
    return this.inventorySpace;
  }

  public getLevel(): ICharacter["level"] {
    return this.level;
  }

  public getName(): ICharacter["name"] {
    return this.name;
  }

  public getOwnerId(): ICharacter["ownerId"] {
    return this.ownerId;
  }

  public getStats(): ICharacter["stats"] {
    return this.stats;
  }

  public setCredits(credits: ICharacter["credits"]): void {
    this.credits = credits;
  }

  public setEffect(effect: IEffect): void {
    if (this.effects) {
      this.effects = _.concat(this.effects, effect);
    }
  }

  public setExperience(experience: ICharacter["experience"]): void {
    this.experience = experience;
  }

  public setInventoryItem(item: IItem): void {
    if (this.inventory) {
      this.inventory = _.concat(this.inventory, item);
    }
  }

  public setInventoryMax(inventoryMax: ICharacter["inventoryMax"]): void {
    this.inventoryMax = inventoryMax;
  }

  public setInventorySpace(inventorySpace: ICharacter["inventorySpace"]): void {
    this.inventorySpace = inventorySpace;
  }

  public setLevel(level: ICharacter["level"]): void {
    this.level = level;
  }

  public setName(name: ICharacter["name"]): void {
    this.name = name;
  }

  public setOwnerId(ownerId: ICharacter["ownerId"]): void {
    this.ownerId = ownerId;
  }

  public addStat(stat: IStat): void {
    if (this.stats) {
      this.stats = _.concat(this.stats, stat);
    }
  }

  public removeEffect(effect: IEffect): void {
    if (this.effects) {
      this.effects = _.pull(this.effects, effect);
    }
  }

  public removeInventory(item: IItem): void {
    if (this.inventory) {
      this.inventory = _.pull(this.inventory, item);
    }
  }

  public removeStat(stat: IStat): void {
    if (this.stats) {
      this.stats = _.pull(this.stats, stat);
    }
  }
}
