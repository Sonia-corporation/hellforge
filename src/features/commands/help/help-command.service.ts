import _ from "lodash";
import { Message } from "discord.js";
import { HelpsEnum } from "../../../enums/helps.enum";
import { DisplayMessageService } from "../../../services/display-message/display-message.service";

export class HelpCommandService {
  private static _instance: HelpCommandService;

  public static getInstance(): HelpCommandService {
    if (_.isNil(HelpCommandService._instance)) {
      HelpCommandService._instance = new HelpCommandService();
    }
    return HelpCommandService._instance;
  }

  public message(message: Message, targetHelp: HelpsEnum): Promise<Message> {
    let messageToSend = ``;
    if (targetHelp === HelpsEnum.HELP) {
      messageToSend = `Welcome to Hell. Your goal, as an inhabitant of the nether realm, is to create the most famous forge of all Hell: The Hellforge. In order to become that, here is what you can do to help you in your journey.`;
    }
    return DisplayMessageService.getInstance().message(message, messageToSend);
  }
}
