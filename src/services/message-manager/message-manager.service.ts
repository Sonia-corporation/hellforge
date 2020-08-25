import _ from "lodash"
import { Message, Client } from "discord.js"
import { PrefixManagerService } from "../prefix-manager/prefix-manager.service"

import { StateNamesEnum } from '../../enums/state-names.enum'
import { Subcommands } from '../../enums/subcommands.enum'
import { Commands } from '../../enums/commands.enum'
import { CharacterCommandService } from "../../features/commands/character/character-command.service"
import { ArgumentsManagerService } from "../arguments-manager/arguments-manager.service"
import { DisplayMessageService } from '../display-message/display-message.service'
import { CharacterCreationService } from '../creation/character/character-creation.service'
import { StateManagerService } from '../state-manager/state-manager.service'

export class MessageManagerService {
  private static _instance: MessageManagerService

  public static getInstance(): MessageManagerService {
    if(_.isNil(MessageManagerService._instance)) {
      MessageManagerService._instance = new MessageManagerService()
    }
    return MessageManagerService._instance
  }

  public messageEvent(client: Client): void {
    client.on('message', (msg: Message) => {
      this._manageMessage(msg)
    })
  }

  private _manageMessage(message: Message): void {
    if (message.guild) {
      if (message.author.bot) return

      const prefix: string = PrefixManagerService.getInstance().getReadablePrefix(message.content)
      const currentState = StateManagerService.getInstance().getBotState()

      if (message.content.startsWith(prefix)) {
        message.channel.startTyping(1)

        const args = ArgumentsManagerService.getInstance().getArguments(message, prefix)
        const command = ArgumentsManagerService.getInstance().extractCommand(args)

        if (command === Commands.CHARACTER) {
          const createArg = args.find(arg => arg === Subcommands.CHARACTER_CREATION)

          if (createArg) CharacterCreationService.getInstance().init(message)
          else CharacterCommandService.getInstance().message(message)
        }
        else DisplayMessageService.getInstance().message(message, ':smiling_imp:')

        return message.channel.stopTyping(true)
      }
      else if (currentState.memberId === message.author.id && currentState.state === StateNamesEnum.CHARACTER_CREATION) {
        if (currentState.step === 1) {
          CharacterCreationService.getInstance().setCharacterName(message)
        }
      }
    }
  }
}
