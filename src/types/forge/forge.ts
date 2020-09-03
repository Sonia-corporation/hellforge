import { ICharacter } from "../character/character";
import { ILocation } from "./location";

export interface IForge {
  angelMash: number;
  bossId: ICharacter["ownerId"];
  experience: number;
  furnitures?: string[];
  level: number;
  location: ILocation;
  name: string;
}
