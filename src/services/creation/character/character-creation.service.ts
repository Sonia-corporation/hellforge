import _ from "lodash";
import { Message, MessageEmbed } from "discord.js";
import { Document } from "mongoose";
import { StateNamesEnum } from "../../../enums/state-names.enum";
import { EmbedColorsEnum } from "../../../enums/embed-colors.enum";
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
        async (characterFound): Promise<Message> => {
          if (!characterFound) {
            const memberId = message.author.id;

            const newState: IState = new Document().toObject();
            newState.memberId = message.author.id;
            newState.state = {
              data: ``,
              name: StateNamesEnum.CHARACTER_CREATION,
              step: 1,
            };

            await StateManagerService.getInstance().setBotState(
              memberId,
              newState
            );

            const embed = new MessageEmbed({
              color: EmbedColorsEnum.INFO,
              description: `Welcome! Type in the name of your character below. You can type 'exit' to quit this mode.`,
              title: `Character Creation`,
            });

            return DisplayMessageService.getInstance().message(message, embed);
          }
          const boldCharacterName = MessageFormattingService.getInstance().format(
            TextFormatsEnum.BOLD,
            characterFound.name
          );
          const embed = new MessageEmbed({
            color: EmbedColorsEnum.ERROR,
            description: `You already have a character, their name is: ${boldCharacterName}`,
            title: `ERROR`,
          });
          return DisplayMessageService.getInstance().message(message, embed);
        }
      );
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
            TextFormatsEnum.BOLD,
            message.content
          );
          const embed = new MessageEmbed({
            color: EmbedColorsEnum.INFO,
            description: `Pleased to meet them... I'm sure we're gonna get along. What will be their foremost stat?`,
            title: formattedCharacterName,
          });

          void DisplayMessageService.getInstance().message(message, embed);
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
          const embed = new MessageEmbed({
            color: EmbedColorsEnum.INFO,
            description: `So, they will be proficient in that specificity, I hope they will have a good use of it.`,
            title: formattedCharacterFisrtStatBonus,
          });

          void DisplayMessageService.getInstance().message(message, embed);
        }
      });
  }
}
