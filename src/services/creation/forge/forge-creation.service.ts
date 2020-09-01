import _ from "lodash";
import { Message, MessageEmbed } from "discord.js";
import { Document } from "mongoose";
import { StateNamesEnum } from "../../../enums/state-names.enum";
import { TextFormatsEnum } from "../../../enums/text-formats.enum";
import { EmbedColorsEnum } from "../../../enums/embed-colors.enum";
import { IState } from "../../../types/global/state";
import { ForgeService } from "../../forge/forge.service";
import { StateManagerService } from "../../state-manager/state-manager.service";
import { DisplayMessageService } from "../../display-message/display-message.service";
import { MessageFormattingService } from "../../message-formating/message-formatting.service";

export class ForgeCreationService {
  private static _instance: ForgeCreationService;

  public static getInstance(): ForgeCreationService {
    if (_.isNil(ForgeCreationService._instance)) {
      ForgeCreationService._instance = new ForgeCreationService();
    }
    return ForgeCreationService._instance;
  }

  public init(message: Message): Promise<Message | void> {
    return ForgeService.getInstance()
      .getEntity(message.author.id)
      .then(
        async (forgeFound): Promise<Message> => {
          if (!forgeFound) {
            const memberId = message.author.id;

            const newState: IState = new Document().toObject();
            newState.memberId = message.author.id;
            newState.state = {
              data: ``,
              name: StateNamesEnum.FORGE_CREATION,
              step: 1,
            };

            await StateManagerService.getInstance().setBotState(
              memberId,
              newState
            );

            const embed = new MessageEmbed({
              color: EmbedColorsEnum.ERROR,
              description: `Type in the name of your forge below. You can type 'exit' to quit this mode.`,
              title: `Forge creation`,
            });

            return DisplayMessageService.getInstance().message(message, embed);
          }

          const boldCharacterName = MessageFormattingService.getInstance().format(
            TextFormatsEnum.BOLD,
            forgeFound.name
          );
          const embed = new MessageEmbed({
            color: EmbedColorsEnum.ERROR,
            description: `Its name is: ${boldCharacterName}`,
            title: `You already have a forge`,
          });

          return DisplayMessageService.getInstance().message(message, embed);
        }
      )
      .catch((): void => {
        console.log(`The forge retrieval failed.`);
      });
  }
}
