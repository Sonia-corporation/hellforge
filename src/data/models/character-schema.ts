import mongoose from "mongoose";
import { ICharacter } from "../../types/character/character";

const characterSchema = new mongoose.Schema(
  {
    credits: Number,
    experience: Number,
    gender: {
      default: `Other`,
      enum: [`Male`, `Female`, `Other`],
      required: true,
      type: String,
    },
    inventory: [
      {
        name: String,
        quantity: Number,
        type: String,
      },
    ],
    inventorySpace: Number,
    level: Number,
    luck: Number,
    name: String,
    ownerId: String,
    stats: {
      aetherisPoints: Number,
      charisma: Number,
      defense: Number,
      dexterity: Number,
      healthPoints: Number,
      mind: Number,
      reflexes: Number,
      senses: Number,
      spirit: Number,
      strength: Number,
      willpower: Number,
    },
  },
  {
    versionKey: false,
  }
);

export = mongoose.model<ICharacter>(
  `characters`,
  characterSchema,
  `characters`
);
