import mongoose from "mongoose";

const stateSchema = new mongoose.Schema(
  {
    memberId: String,
    state: {
      name: String,
      step: Number,
      data: String,
    },
  },
  {
    versionKey: false,
  }
);

export = mongoose.model(`states`, stateSchema, `states`);
