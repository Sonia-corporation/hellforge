import { Message } from "discord.js";
import _ from "lodash";
import { TextFormatsEnum } from "../../../enums/text-formats.enum";
import { CharacterService } from "../../../services/character/character.service";
import { DisplayMessageService } from "../../../services/display-message/display-message.service";
import { MessageFormattingService } from "../../../services/message-formating/message-formatting.service";

export class CharacterCommandService {
  private static _instance: CharacterCommandService;

  public static getInstance(): CharacterCommandService {
    if (_.isNil(CharacterCommandService._instance)) {
      CharacterCommandService._instance = new CharacterCommandService();
    }
    return CharacterCommandService._instance;
  }

  public message(message: Message): Promise<Message> {
    return CharacterService.getInstance()
      .getEntity(message.author.id)
      .then(
        (characterFound): Promise<Message> => {
          if (characterFound) {
            const boldCharacterName = MessageFormattingService.getInstance().format(
              TextFormatsEnum.BOLD,
              characterFound.name
            );
            return Promise.resolve(
              DisplayMessageService.getInstance().message(
                message,
                `Your character's name is: ${boldCharacterName}`
              )
            );
          }

          return Promise.reject(
            DisplayMessageService.getInstance().message(
              message,
              `Character not found.`
            )
          );
        }
      );
  }
}
