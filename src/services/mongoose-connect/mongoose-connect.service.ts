import _ from 'lodash'
import mongoose from "mongoose"
import { login, password } from "../../../credentials.json"

export class MongooseConnect {
  private static _instance: MongooseConnect

  public static getInstance(): MongooseConnect {
    if(_.isNil(MongooseConnect._instance)) {
      MongooseConnect._instance = new MongooseConnect()
    }
    return MongooseConnect._instance
  }

  public init() {
    mongoose.connect(`mongodb+srv://${login}:${password}@cluster0.zmch1.gcp.mongodb.net/hellforge-bot-db?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }, (error: Error) => {
        if (error) throw error

        console.log('Connected to MongoDB!')
      }
    )
  }
}