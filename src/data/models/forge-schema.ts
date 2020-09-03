import mongoose from "mongoose";
import { Forge } from "../../classes/forge/forge";

const forgeSchema = new mongoose.Schema(
  {
    angelMash: Number,
    bossName: String,
    experience: Number,
    furnitures: [
      {
        name: String,
        position: {
          x: Number,
          y: Number,
        },
        quantity: Number,
      },
    ],
    level: Number,
    location: {
      name: String,
      x: Number,
      y: Number,
    },
    name: String,
  },
  {
    versionKey: false,
  }
);

export default mongoose.model<Forge>(`Forges`, forgeSchema, `forges`);
