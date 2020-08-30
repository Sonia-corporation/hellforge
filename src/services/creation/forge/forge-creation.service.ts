import _ from "lodash";
import { Message } from "discord.js";
import { Document } from "mongoose";
import { StateNamesEnum } from "../../../enums/state-names.enum";
import { TextFormatsEnum } from "../../../enums/text-formats.enum";
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

  public init(message: Message): Promise<void> {
    return ForgeService.getInstance()
      .getEntity(message.author.id)
      .then((forgeFound): void => {
        if (!forgeFound) {
          const memberId = message.author.id;

          const newState: IState = new Document().toObject();
          newState.memberId = message.author.id;
          newState.state = {
            data: ``,
            name: StateNamesEnum.FORGE_CREATION,
            step: 1,
          };

          void StateManagerService.getInstance().setBotState(
            memberId,
            newState
          );

          void DisplayMessageService.getInstance().message(
            message,
            `Welcome to the forge creation. Type in the name of your forge below. You can type 'exit' to quit this mode.`
          );
        } else {
          const boldCharacterName = MessageFormattingService.getInstance().format(
            TextFormatsEnum.BOLD,
            forgeFound.name
          );
          void DisplayMessageService.getInstance().message(
            message,
            `You already have a forge, its name is: ${boldCharacterName}`
          );
        }
      })
      .catch((): void => {
        console.log(`The forge retrieval failed.`);
      });
  }
}
