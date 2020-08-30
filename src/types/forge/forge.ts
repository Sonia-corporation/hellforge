import { Document } from "mongoose";
import { ICharacter } from "../character/character";
import { ILocation } from "./location";

export interface IForge extends Document {
  angelMash: number;
  bossId: ICharacter["ownerId"];
  experience: number;
  furnitures: string[];
  level: number;
  location: ILocation;
  name: string;
}
