import _ from "lodash";
import { Message, MessageEmbed } from "discord.js";
import { SubcommandsEnum } from "../../../enums/subcommands.enum";
import { EmbedColorsEnum } from "../../../enums/embed-colors.enum";
import { ICharacter } from "../../../types/character/character";
import { CharacterService } from "../../character/character.service";
import { DisplayMessageService } from "../../display-message/display-message.service";
import { MessageFormattingService } from "../../message-formating/message-formatting.service";

export class CharacterRenamingService {
  private static _instance: CharacterRenamingService;

  public static getInstance(): CharacterRenamingService {
    if (_.isNil(CharacterRenamingService._instance)) {
      CharacterRenamingService._instance = new CharacterRenamingService();
    }
    return CharacterRenamingService._instance;
  }

  public extractName(
    message: Message,
    args: string[]
  ): Promise<Message | void> {
    const renameIndex = args.findIndex(
      (arg): boolean => arg === SubcommandsEnum.RENAMING
    );
    const nameArg = args.splice(renameIndex + 1);

    if (nameArg.length > 0) {
      return this.rename(message, message.author.id, nameArg.join(` `));
    }

    return Promise.reject(Error(`The rename command wasn't handled properly.`));
  }

  public async rename(
    message: Message,
    memberId: ICharacter["ownerId"],
    newName: ICharacter["name"]
  ): Promise<Message | void> {
    const existingEntity = await CharacterService.getInstance().getEntity(
      memberId
    );

    if (existingEntity) {
      existingEntity.name = newName;

      await CharacterService.getInstance().setEntity(memberId, existingEntity);

      const newEntityNameBold = MessageFormattingService.getInstance().bold(
        newName
      );
      const embed = new MessageEmbed({
        color: EmbedColorsEnum.SUCCESS,
        description: `To: ${newEntityNameBold}`,
        title: `Character renamed`,
      });

      return DisplayMessageService.getInstance().message(message, embed);
    }

    return Promise.reject(
      Error(`The entity wasn't found with the provided memberID: ${memberId}`)
    );
  }
}
