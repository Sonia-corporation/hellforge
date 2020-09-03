import mongoose from "mongoose";
import { State } from "../../classes/state/state";

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

export default mongoose.model<State>(`States`, stateSchema, `states`);
