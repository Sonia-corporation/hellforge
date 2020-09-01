import { Message, MessageEmbed } from "discord.js";
import _ from "lodash";
import { EmbedColorsEnum } from "../../../enums/embed-colors.enum";
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

  public message(message: Message): Promise<Message> {
    return CharacterService.getInstance()
      .getEntity(message.author.id)
      .then(
        (characterFound): Promise<Message> => {
          if (characterFound) {
            const embed = new MessageEmbed({
              color: EmbedColorsEnum.INFO,
              title: characterFound.name,
            });

            return DisplayMessageService.getInstance().message(message, embed);
          }

          return Promise.reject(
            Error(`Could not find the character from the given message.`)
          );
        }
      );
  }
}
