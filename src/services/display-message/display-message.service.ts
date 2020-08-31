import { Message } from "discord.js";
import _ from "lodash";

export class DisplayMessageService {
  private static _instance: DisplayMessageService;

  public static getInstance(): DisplayMessageService {
    if (_.isNil(DisplayMessageService._instance)) {
      DisplayMessageService._instance = new DisplayMessageService();
    }
    return DisplayMessageService._instance;
  }

  public message(
    messageToAnswer: Message,
    messageToSend: string
  ): Promise<Message> {
    return messageToAnswer.channel.send(messageToSend);
  }
}
