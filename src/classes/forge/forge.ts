import _ from "lodash";
import { Document } from "mongoose";
import { IForge } from "../../types/forge/forge";
import { LocationEnum } from "../../enums/location.enum";

export class Forge extends Document implements IForge {
  public angelMash: IForge["angelMash"] = 100;
  public bossId: IForge["bossId"] = `000000000000000000`;
  public experience: IForge["experience"] = 0;
  public furnitures: IForge["furnitures"];
  public level: IForge["level"] = 1;
  public location: IForge["location"] = {
    name: LocationEnum.COMMON_FORGE,
    x: 0,
    y: 0,
  };
  public name: IForge["name"] = `My First Forge`;

  constructor() {
    super();
  }

  public getAngelMash(): IForge["angelMash"] {
    return this.angelMash;
  }

  public getBossId(): IForge["bossId"] {
    return this.bossId;
  }

  public getExperience(): IForge["experience"] {
    return this.experience;
  }

  public getFurnitures(): IForge["furnitures"] {
    return this.furnitures;
  }

  public getLevel(): IForge["level"] {
    return this.level;
  }

  public getLocation(): IForge["location"] {
    return this.location;
  }

  public getName(): IForge["name"] {
    return this.name;
  }

  public setAngelMash(angelMash: IForge["angelMash"]): void {
    this.angelMash = angelMash;
  }

  public setBossId(bossId: IForge["bossId"]): void {
    this.bossId = bossId;
  }

  public setExperience(experience: IForge["experience"]): void {
    this.experience = experience;
  }

  public setFurnitures(furniture: string): void {
    if (this.furnitures) {
      this.furnitures = _.concat(this.furnitures, furniture);
    }
  }

  public setLevel(level: IForge["level"]): void {
    this.level = level;
  }

  public setLocation(location: IForge["location"]): void {
    this.location = location;
  }

  public setName(name: IForge["name"]): void {
    this.name = name;
  }
}
