import _ from "lodash";
import { Message, MessageEmbed, MessageAttachment } from "discord.js";
import Canvas from "canvas";
import { HelpsEnum } from "../../../enums/helps.enum";
import { EmbedColorsEnum } from "../../../enums/embed-colors.enum";
import { DisplayMessageService } from "../../../services/display-message/display-message.service";

export class HelpCommandService {
  private static _instance: HelpCommandService;

  public static getInstance(): HelpCommandService {
    if (_.isNil(HelpCommandService._instance)) {
      HelpCommandService._instance = new HelpCommandService();
    }
    return HelpCommandService._instance;
  }

  public async message(
    message: Message,
    helpToDisplay: HelpsEnum
  ): Promise<Message> {
    const embed = new MessageEmbed({
      color: EmbedColorsEnum.HELP,
    });
    if (helpToDisplay === HelpsEnum.HELP) {
      embed.title = `Welcome to Hell`;
      embed.description = `Your goal, as an inhabitant of the nether realm, is to create the most famous forge of all Hell: The Hellforge. In order to become that, here is what you can do to help you in your journey.`;
    }

    const canvas = Canvas.createCanvas(700, 300);
    const context = canvas.getContext(`2d`);

    context.fillStyle = `#B33771`;
    context.fillRect(0, 0, canvas.width, canvas.height);

    const helpAttachment = new MessageAttachment(canvas.toBuffer(), `help.png`);

    return DisplayMessageService.getInstance().message(
      message,
      embed,
      helpAttachment
    );
  }
}
