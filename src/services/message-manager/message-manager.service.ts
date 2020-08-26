import _ from "lodash"
import { Message, Client } from "discord.js"
import { PrefixManagerService } from "../prefix-manager/prefix-manager.service"

import { StateNamesEnum } from "../../enums/state-names.enum"
import { SubcommandsEnum } from "../../enums/subcommands.enum"
import { CommandsEnum } from "../../enums/commands.enum"
import { CharacterCommandService } from "../../features/commands/character/character-command.service"
import { ArgumentsManagerService } from "../arguments-manager/arguments-manager.service"
import { DisplayMessageService } from "../display-message/display-message.service"
import { CharacterCreationService } from "../creation/character/character-creation.service"
import { StateManagerService } from "../state-manager/state-manager.service"

export class MessageManagerService {
  private static _instance: MessageManagerService;

  public static getInstance(): MessageManagerService {
    if (_.isNil(MessageManagerService._instance)) {
      MessageManagerService._instance = new MessageManagerService()
    }
    return MessageManagerService._instance
  }

  public messageEvent(client: Client): void {
    client.on("message", (msg: Message) => {
      this._manageMessage(msg)
    })
  }

  private _manageMessage(message: Message): void {
    if (message.guild) {
      if (message.author.bot) return

      const prefix: string = PrefixManagerService.getInstance().getReadablePrefix(
        message.content,
      )

      if (message.content.startsWith(prefix)) {
        message.channel.startTyping(1)

        const args = ArgumentsManagerService.getInstance().getArguments(
          message,
          prefix,
        )
        const command = ArgumentsManagerService.getInstance().extractCommand(
          args,
        )

        if (command === CommandsEnum.CHARACTER) {
          const createArg = args.find(
            (arg) => arg === SubcommandsEnum.CHARACTER_CREATION,
          )

          if (createArg) CharacterCreationService.getInstance().init(message)
          else CharacterCommandService.getInstance().message(message)
        } else DisplayMessageService.getInstance().message(message, ":smiling_imp:")

        return message.channel.stopTyping(true)
      }

      StateManagerService.getInstance()
        .getBotState(message.author.id)
        .then((stateFound): void => {
          if (
            message.content.startsWith("exit")
            && stateFound.state.name !== StateNamesEnum.NORMAL
          ) {
            message.channel.startTyping(1)

            StateManagerService.getInstance().setBotState(message.author.id, {
              memberId: message.author.id,
              state: {
                name: StateNamesEnum.NORMAL,
                step: 0,
                data: "",
              },
            })

            DisplayMessageService.getInstance().message(
              message,
              "You just exited what you were doing.",
            )

            return message.channel.stopTyping(true)
          }

          if (stateFound.state.name === StateNamesEnum.CHARACTER_CREATION) {
            message.channel.startTyping(1)

            if (stateFound.state.step === 1) {
              CharacterCreationService.getInstance().setCharacterName(message)
            } else if (stateFound.state.step === 2) {
              CharacterCreationService.getInstance().setCharacterFirstBonus(
                message,
              )
            }

            return message.channel.stopTyping(true)
          }
        })
    }
  }
}
