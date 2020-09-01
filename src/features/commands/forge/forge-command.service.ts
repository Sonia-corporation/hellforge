import _ from "lodash";
import { Message, MessageEmbed } from "discord.js";
import { TextFormatsEnum } from "../../../enums/text-formats.enum";
import { EmbedColorsEnum } from "../../../enums/embed-colors.enum";
import { ForgeService } from "../../../services/forge/forge.service";
import { DisplayMessageService } from "../../../services/display-message/display-message.service";
import { MessageFormattingService } from "../../../services/message-formating/message-formatting.service";

export class ForgeCommandService {
  private static _instance: ForgeCommandService;

  public static getInstance(): ForgeCommandService {
    if (_.isNil(ForgeCommandService._instance)) {
      ForgeCommandService._instance = new ForgeCommandService();
    }
    return ForgeCommandService._instance;
  }

  public message(message: Message): Promise<Message> {
    return ForgeService.getInstance()
      .getEntity(message.author.id)
      .then(
        (forgeFound): Promise<Message> => {
          if (forgeFound) {
            const boldForgeName = MessageFormattingService.getInstance().format(
              TextFormatsEnum.BOLD,
              forgeFound.name
            );
            const embed = new MessageEmbed({
              color: EmbedColorsEnum.INFO,
              description: boldForgeName,
              title: `Forge name`,
            });

            return DisplayMessageService.getInstance().message(message, embed);
          }

          return Promise.reject(
            Error(`Could not find the forge from the given message.`)
          );
        }
      );
  }
}
