import { Document } from "mongoose";
import { ICharacter } from "../character/character";

export interface IForge extends Document {
  angelMash: number;
  bossId: ICharacter["ownerId"];
  experience: number;
  furnitures: string[];
  level: number;
  name: string;
}
