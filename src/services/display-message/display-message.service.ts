import _ from "lodash";
import { Message, MessageEmbed, MessageAttachment } from "discord.js";

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
    embedToSend: MessageEmbed,
    attachment?: MessageAttachment
  ): Promise<Message> {
    if (attachment) {
      return messageToAnswer.channel.send(attachment);
    }
    return messageToAnswer.channel.send({ embed: embedToSend });
  }
}
