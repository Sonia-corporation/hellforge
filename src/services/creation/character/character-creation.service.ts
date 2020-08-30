import _ from "lodash";
import { Message } from "discord.js";
import { Document } from "mongoose";
import { StateNamesEnum } from "../../../enums/state-names.enum";
import { CharacterService } from "../../character/character.service";
import { DisplayMessageService } from "../../display-message/display-message.service";
import { StateManagerService } from "../../state-manager/state-manager.service";
import { MessageFormattingService } from "../../message-formating/message-formatting.service";
import { TextFormatsEnum } from "../../../enums/text-formats.enum";
import { IState } from "../../../types/global/state";

export class CharacterCreationService {
  private static _instance: CharacterCreationService;

  public static getInstance(): CharacterCreationService {
    if (_.isNil(CharacterCreationService._instance)) {
      CharacterCreationService._instance = new CharacterCreationService();
    }
    return CharacterCreationService._instance;
  }

  public init(message: Message): Promise<Message | void> {
    return CharacterService.getInstance()
      .getEntity(message.author.id)
      .then(
        (characterFound): Promise<Message> => {
          if (!characterFound) {
            const memberId = message.author.id;

            const newState: IState = new Document().toObject();
            newState.memberId = message.author.id;
            newState.state = {
              data: ``,
              name: StateNamesEnum.CHARACTER_CREATION,
              step: 1,
            };

            void StateManagerService.getInstance().setBotState(
              memberId,
              newState
            );

            void DisplayMessageService.getInstance().message(
              message,
              `Welcome to the character creation. Type in the name of your character below. You can type 'exit' to quit this mode.`
            );
          }

          const boldCharacterName = MessageFormattingService.getInstance().format(
            TextFormatsEnum.BOLD,
            characterFound.name
          );
          void DisplayMessageService.getInstance().message(
            message,
            `You already have a character, their name is: ${boldCharacterName}`
          );
        }
      )
      .catch((): void => {
        console.log(`The character retrieval failed.`);
      });
  }

  public setCharacterName(message: Message): Promise<void> {
    const memberId = message.author.id;
    return StateManagerService.getInstance()
      .getBotState(memberId)
      .then((foundState: IState | void): void => {
        if (foundState) {
          const newState: IState = new Document().toObject();
          newState.memberId = message.author.id;
          newState.state = {
            data: `${foundState.state.data},${message.content}`,
            name: StateNamesEnum.CHARACTER_CREATION,
            step: 2,
          };

          void StateManagerService.getInstance().setBotState(
            memberId,
            newState
          );

          const formattedCharacterName = MessageFormattingService.getInstance().format(
            TextFormatsEnum.ITALIC_BOLD,
            message.content
          );
          void DisplayMessageService.getInstance().message(
            message,
            `Pleased to meet ${formattedCharacterName}... What will be their foremost stat?`
          );
        }
      });
  }

  public setCharacterFirstBonus(message: Message): Promise<void> {
    const memberId = message.author.id;
    return StateManagerService.getInstance()
      .getBotState(memberId)
      .then((foundState: IState | void): void => {
        if (foundState) {
          const newState: IState = new Document().toObject();
          newState.memberId = message.author.id;
          newState.state = {
            data: `${foundState.state.data},${message.content}`,
            name: StateNamesEnum.CHARACTER_CREATION,
            step: 3,
          };

          void StateManagerService.getInstance().setBotState(
            memberId,
            newState
          );

          const formattedCharacterFisrtStatBonus = MessageFormattingService.getInstance().format(
            TextFormatsEnum.ITALIC_BOLD,
            message.content
          );
          void DisplayMessageService.getInstance().message(
            message,
            `So, they will be proficient at ${formattedCharacterFisrtStatBonus}, I hope they will have a good use of it.`
          );
        }
      });
  }
}
