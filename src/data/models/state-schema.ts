import mongoose from "mongoose";

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

export = mongoose.model(`states`, stateSchema, `states`);
