import mongoose from "mongoose";
import { ISmith } from "../../types/character/smith";

const smithSchema = new mongoose.Schema(
  {
    beheviour: String,
    description: String,
    equipment: [
      {
        name: String,
      },
    ],
    name: String,
    objects: [
      {
        name: String,
      },
    ],
    startingLevel: Number,
    stats: [
      {
        name: String,
        value: Number,
      },
    ],
    type: String,
    weapons: [
      {
        name: String,
      },
    ],
  },
  {
    versionKey: false,
  }
);

export default mongoose.model<ISmith>(`Smiths`, smithSchema, `smiths`);
