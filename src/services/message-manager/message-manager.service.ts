import { Client, Message } from "discord.js";
import _ from "lodash";
import { CommandsEnum } from "../../enums/commands.enum";

import { SubcommandsEnum } from "../../enums/subcommands.enum";
import { StateNamesEnum } from "../../enums/state-names.enum";
import { CharacterCommandService } from "../../features/commands/character/character-command.service";
import { ArgumentsManagerService } from "../arguments-manager/arguments-manager.service";
import { CharacterCreationService } from "../creation/character/character-creation.service";
import { DisplayMessageService } from "../display-message/display-message.service";
import { PrefixManagerService } from "../prefix-manager/prefix-manager.service";
import { StateManagerService } from "../state-manager/state-manager.service";

export class MessageManagerService {
  private static _instance: MessageManagerService;

  public static getInstance(): MessageManagerService {
    if (_.isNil(MessageManagerService._instance)) {
      MessageManagerService._instance = new MessageManagerService();
    }
    return MessageManagerService._instance;
  }

  public messageEvent(client: Client): void {
    client.on(`message`, (msg: Message): void => {
      this._manageMessage(msg);
    });
  }

  private _manageMessage(message: Message): void {
    if (message.guild) {
      if (message.author.bot) {
        return;
      }

      const prefix: string = PrefixManagerService.getInstance().getReadablePrefix(
        message.content
      );

      if (message.content.startsWith(prefix)) {
        void message.channel.startTyping(1);

        const args = ArgumentsManagerService.getInstance().getArguments(
          message,
          prefix
        );
        const command = ArgumentsManagerService.getInstance().extractCommand(
          args
        );

        if (command === CommandsEnum.CHARACTER) {
          const createArg = args.find(
            (arg): boolean => arg === SubcommandsEnum.CHARACTER_CREATION
          );

          if (createArg) {
            void CharacterCreationService.getInstance().init(message);
          } else {
            CharacterCommandService.getInstance().message(message);
          }
        } else {
          DisplayMessageService.getInstance().message(message, `:smiling_imp:`);
        }

        return message.channel.stopTyping(true);
      }

      StateManagerService.getInstance()
        .getBotState(message.author.id)
        .then((foundstate): void => {
          if (
            message.content.startsWith(`exit`) &&
            foundstate.state.name !== StateNamesEnum.NORMAL
          ) {
            void message.channel.startTyping(1);

            StateManagerService.getInstance().setBotState(message.author.id, {
              memberId: message.author.id,
              state: {
                data: ``,
                name: StateNamesEnum.NORMAL,
                step: 0,
              },
            });

            DisplayMessageService.getInstance().message(
              message,
              `You just exited what you were doing.`
            );

            return message.channel.stopTyping(true);
          }

          if (foundstate.state.name === StateNamesEnum.CHARACTER_CREATION) {
            void message.channel.startTyping(1);

            if (foundstate.state.step === 2) {
              CharacterCreationService.getInstance()
                .setCharacterName(message)
                .catch((err: string): void => {
                  console.log(`Couldn't get to step 2 because of: ${err}`);
                });
            } else if (foundstate.state.step === 3) {
              CharacterCreationService.getInstance()
                .setCharacterFirstBonus(message)
                .catch((err: string): void => {
                  console.log(`Couldn't get to step 3 because of: ${err}`);
                });
            }

            return message.channel.stopTyping(true);
          }
        })
        .catch((err: string): void => {
          console.log(`Couldn't get the state because of: ${err}`);
        });
    }
  }
}
