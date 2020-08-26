import { Message } from "discord.js";
import _ from "lodash";
import { CharacterService } from "../../../services/character/character.service";
import { DisplayMessageService } from "../../../services/display-message/display-message.service";

export class CharacterCommandService {
  private static _instance: CharacterCommandService;

  public static getInstance(): CharacterCommandService {
    if (_.isNil(CharacterCommandService._instance)) {
      CharacterCommandService._instance = new CharacterCommandService();
    }
    return CharacterCommandService._instance;
  }

  public message(message: Message): void {
    CharacterService.getInstance()
      .getEntity(message.author.id)
      .then((characterFound) => {
        if (characterFound) {
          // @todo fix
          // const boldCharacterName = MessageFormattingService.getInstance().format(
          //   TextFormats.BOLD,
          //   characterFound.name
          // );
          // DisplayMessageService.getInstance().message(
          //   message,
          //   `Your character's name is: ${boldCharacterName}`
          // );
        } else {
          DisplayMessageService.getInstance().message(
            message,
            `Character not found.`
          );
        }
      });
  }
}
