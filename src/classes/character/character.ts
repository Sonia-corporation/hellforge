import _ from "lodash";
import { Document } from "mongoose";
import { ICharacter } from "../../types/character/character";
import { IStat } from "../../types/character/stat";
import { IItem } from "../../types/shop/item";
import { IEffect } from "../../types/skill/effect";

export class Character extends Document implements ICharacter {
  public credits: ICharacter["credits"];
  public effects?: ICharacter["effects"];
  public experience: ICharacter["experience"];
  public inventory?: ICharacter["inventory"];
  public inventoryMax: ICharacter["inventoryMax"];
  public inventorySpace: ICharacter["inventorySpace"];
  public level: ICharacter["level"];
  public name: ICharacter["name"];
  public ownerId: ICharacter["ownerId"];
  public stats: ICharacter["stats"];

  public constructor() {
    super();
    this.credits = 300;
    this.experience = 0;
    this.inventoryMax = 250;
    this.inventorySpace = 0;
    this.level = 1;
    this.name = `Character Name`;
    this.ownerId = `000000000000000000`;
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
    _.concat(this.effects, effect);
  }

  public setExperience(experience: ICharacter["experience"]): void {
    this.experience = experience;
  }

  public setInventoryItem(item: IItem): void {
    _.concat(this.inventory, item);
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

  public setStat(stat: IStat): void {
    _.concat(this.stats, stat);
  }

  public removeEffect(effect: IEffect): void {
    if (this.effects) {
      _.pull(this.effects, effect);
    }
  }

  public removeInventory(item: IItem): void {
    if (this.inventory) {
      _.pull(this.inventory, item);
    }
  }

  public removeStat(stat: IStat): void {
    if (this.stats) {
      _.pull(this.stats, stat);
    }
  }
}
