import _ from "lodash";
import { Message } from "discord.js";
import { TextFormatsEnum } from "../../../enums/text-formats.enum";
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

  public message(message: Message): Promise<void> {
    return ForgeService.getInstance()
      .getEntity(message.author.id)
      .then((forgeFound): void => {
        if (forgeFound) {
          const boldForgeName = MessageFormattingService.getInstance().format(
            TextFormatsEnum.BOLD,
            forgeFound.name
          );
          void DisplayMessageService.getInstance().message(
            message,
            `Your forge's name is: ${boldForgeName}`
          );
        }
      })
      .catch((): void => {
        void DisplayMessageService.getInstance().message(
          message,
          `Forge not found.`
        );
      });
  }
}
