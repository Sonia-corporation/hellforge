import mongoose from 'mongoose'

const stateSchama = new mongoose.Schema({
  memberId: String,
  state: {
    name: String,
    step: Number,
    data: String
  }
},
{
  versionKey: false 
})

export = mongoose.model("states", stateSchama, "states")
