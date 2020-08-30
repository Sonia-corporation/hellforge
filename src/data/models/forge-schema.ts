import mongoose from "mongoose";
import { IForge } from "../../types/forge/forge";

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

export default mongoose.model<IForge>(`Forges`, forgeSchema, `forges`);
