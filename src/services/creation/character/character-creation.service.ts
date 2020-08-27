import { Message } from "discord.js";
import _ from "lodash";
import { StateNamesEnum } from "../../../enums/state-names.enum";
import { CharacterService } from "../../character/character.service";
import { DisplayMessageService } from "../../display-message/display-message.service";
import { StateManagerService } from "../../state-manager/state-manager.service";
import { MessageFormattingService } from "../../message-formating/message-formatting.service";
import { TextFormatsEnum } from "../../../enums/text-formats.enum";

export class CharacterCreationService {
  private static _instance: CharacterCreationService;

  public static getInstance(): CharacterCreationService {
    if (_.isNil(CharacterCreationService._instance)) {
      CharacterCreationService._instance = new CharacterCreationService();
    }
    return CharacterCreationService._instance;
  }

  public init(message: Message): void {
    CharacterService.getInstance()
      .getEntity(message.author.id)
      .then((characterFound): void => {
        if (!characterFound) {
          const memberId = message.author.id;

          StateManagerService.getInstance().setBotState(memberId, {
            memberId,
            state: {
              data: ``, // The data from the state will have a CSV format value.
              name: StateNamesEnum.CHARACTER_CREATION,
              step: 1,
            },
          });

          DisplayMessageService.getInstance().message(
            message,
            `Welcome to the character creation. Type in the name of your character below. You can type 'exit' to quit this mode.`
          );
        } else {
          const boldCharacterName = MessageFormattingService.getInstance().format(
            TextFormatsEnum.BOLD,
            characterFound.name
          );
          DisplayMessageService.getInstance().message(
            message,
            `You already have a character, their name is: ${boldCharacterName}`
          );
        }
      })
      .catch((_err: string): void => {
        console.log(`The character retrieveing failed.`);
      });
  }

  public async setCharacterName(message: Message): Promise<void> {
    const memberId = message.author.id;
    const previousState = await StateManagerService.getInstance().getBotState(
      memberId
    );

    StateManagerService.getInstance().setBotState(memberId, {
      memberId,
      state: {
        data: `${previousState.state.data},${message.content},`,
        name: StateNamesEnum.CHARACTER_CREATION,
        step: 2,
      },
    });

    const formattedCharacterName = MessageFormattingService.getInstance().format(
      TextFormatsEnum.BOLD,
      message.content
    );
    DisplayMessageService.getInstance().message(
      message,
      `Pleased to meet ${formattedCharacterName}... What will be their foremost stat?`
    );
  }

  public async setCharacterFirstBonus(message: Message): Promise<void> {
    const memberId = message.author.id;
    const previousState = await StateManagerService.getInstance().getBotState(
      memberId
    );

    StateManagerService.getInstance().setBotState(memberId, {
      memberId,
      state: {
        data: `${previousState.state.data},${message.content},`,
        name: StateNamesEnum.CHARACTER_CREATION,
        step: 3,
      },
    });

    const formattedCharacterFisrtStatBonus = MessageFormattingService.getInstance().format(
      TextFormatsEnum.ITALIC_BOLD,
      message.content
    );
    DisplayMessageService.getInstance().message(
      message,
      `So, they will be proficient at ${formattedCharacterFisrtStatBonus}, I hope they will have a good use of it.`
    );
  }
}
