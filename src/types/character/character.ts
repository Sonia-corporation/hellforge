import { Document } from "mongoose";
import { IItem } from "../shop/item";
import { IEffect } from "../skills/effect";
import { IStat } from "./stat";

export interface ICharacter extends Document {
  credits: number;
  effects: IEffect[];
  experience: number;
  gender: string;
  inventory: IItem[];
  inventoryMax: number;
  inventorySpace: number;
  level: number;
  name: string;
  ownerId: string;
  stats: IStat[];
}
