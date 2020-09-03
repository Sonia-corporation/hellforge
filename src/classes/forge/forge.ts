import _ from "lodash";
import { Document } from "mongoose";
import { IForge } from "../../types/forge/forge";
import { LocationEnum } from "../../enums/location.enum";

export class Forge extends Document implements IForge {
  public angelMash: IForge["angelMash"];
  public bossId: IForge["bossId"];
  public experience: IForge["experience"];
  public furnitures: IForge["furnitures"];
  public level: IForge["level"];
  public location: IForge["location"];
  public name: IForge["name"];

  constructor() {
    super();
    this.angelMash = 100;
    this.bossId = `000000000000000000`;
    this.experience = 0;
    this.level = 1;
    this.location = {
      name: LocationEnum.COMMON_FORGE,
      x: 0,
      y: 0,
    };
    this.name = `My First Forge`;
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
    _.concat(this.furnitures, furniture);
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
