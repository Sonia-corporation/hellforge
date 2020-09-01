import _ from "lodash";
import { Message } from "discord.js";
import { SubcommandsEnum } from "../../../enums/subcommands.enum";
import { IForge } from "../../../types/forge/forge";
import { ForgeService } from "../../forge/forge.service";
import { DisplayMessageService } from "../../display-message/display-message.service";
import { MessageFormattingService } from "../../message-formating/message-formatting.service";

export class ForgeRenamingService {
  private static _instance: ForgeRenamingService;

  public static getInstance(): ForgeRenamingService {
    if (_.isNil(ForgeRenamingService._instance)) {
      ForgeRenamingService._instance = new ForgeRenamingService();
    }
    return ForgeRenamingService._instance;
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
    memberId: IForge["bossId"],
    newName: IForge["name"]
  ): Promise<Message | void> {
    const existingForge = await ForgeService.getInstance().getEntity(memberId);

    if (existingForge) {
      existingForge.name = newName;
      await ForgeService.getInstance().setEntity(memberId, existingForge);

      const newForgeNameBold = MessageFormattingService.getInstance().bold(
        newName
      );

      return DisplayMessageService.getInstance().message(
        message,
        `Your character was renamed to: ${newForgeNameBold}`
      );
    }

    return Promise.reject(
      Error(
        `The character wasn't found with the provided memberID: ${memberId}`
      )
    );
  }
}
