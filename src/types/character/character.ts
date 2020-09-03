import { IItem } from "../shop/item";
import { IEffect } from "../skill/effect";
import { IStat } from "./stat";

export interface ICharacter {
  credits: number;
  effects?: IEffect[];
  experience: number;
  inventory?: IItem[];
  inventoryMax: number;
  inventorySpace: number;
  level: number;
  name: string;
  ownerId: string;
  stats?: IStat[];
}
