import mongoose from "mongoose"

const characterSchema = new mongoose.Schema(
  {
    ownerId: String,
    name: String,
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      default: "Other",
      required: true,
    },
    level: Number,
    experience: Number,
    stats: {
      healthPoints: Number,
      aetherisPoints: Number,
      strength: Number,
      dexterity: Number,
      defense: Number,
      reflexes: Number,
      senses: Number,
      charisma: Number,
      mind: Number,
      spirit: Number,
      willpower: Number,
    },
    luck: Number,
    credits: Number,
    inventorySpace: Number,
    inventory: [
      {
        name: String,
        quantity: Number,
        type: String,
      },
    ],
  },
  {
    versionKey: false,
  },
)

export = mongoose.model("characters", characterSchema, "characters");
