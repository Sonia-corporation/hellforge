import mongoose from "mongoose";
import { IState } from "../../types/global/state";

const stateSchema = new mongoose.Schema(
  {
    memberId: String,
    state: {
      data: String,
      name: String,
      step: Number,
    },
  },
  {
    versionKey: false,
  }
);

export = mongoose.model<IState>(`states`, stateSchema, `states`);
