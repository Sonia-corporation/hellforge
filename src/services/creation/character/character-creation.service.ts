import _ from "lodash"
import { Message, MessageEmbed } from "discord.js"
import { TextFormats } from "../../../enums/text-formats.enum"
import { StateNamesEnum } from "../../../enums/state-names.enum"
import { EmbedColorsEnum } from '../../../enums/embed-colors.enum'
import { DisplayMessageService } from "../../display-message/display-message.service"
import { CharacterService } from "../../character/character.service"
import { MessageFormattingService } from "../../message-formating/message-formatting.service"
import { StateManagerService } from "../../state-manager/state-manager.service"

export class CharacterCreationService {
  private static _instance: CharacterCreationService

  public static getInstance(): CharacterCreationService {
    if(_.isNil(CharacterCreationService._instance)) {
      CharacterCreationService._instance = new CharacterCreationService()
    }
    return CharacterCreationService._instance
  }

  public init(message: Message): void {
    CharacterService.getInstance().getEntity(message.author.id)
    .then((characterFound): void => {
      if (!characterFound) {
        const memberId = message.author.id

        StateManagerService.getInstance().setBotState(memberId, {
          memberId,
          state: {
            name: StateNamesEnum.CHARACTER_CREATION,
            step: 1,
            data: ''
          }
        }) // The data from the state will have a CSV format value.
        const embed = new MessageEmbed({
          color: EmbedColorsEnum.INFO,
          title: `CHaracter Creation`,
          description: `Welcome! Type in the name of your character below. You can type 'exit' to quit this mode.`
        })
        DisplayMessageService.getInstance().message(message, embed)
      }
      else {
        const boldCharacterName = MessageFormattingService.getInstance().format(TextFormats.BOLD, characterFound.name)
        const embed = new MessageEmbed({
          color: EmbedColorsEnum.ERROR,
          title: `ERROR`,
          description: `You already have a character, their name is: ${boldCharacterName}`
        })
        DisplayMessageService.getInstance().message(message, embed)
      }
    })
  }

  public setCharacterName(message: Message): void {
    const memberId = message.author.id

    StateManagerService.getInstance().setBotState(memberId, {
      memberId,
      state: {
        name: StateNamesEnum.CHARACTER_CREATION,
        step: 2,
        data: `${stateFound.state.data},${message.content},`
      }
    })

    const formattedCharacterName = MessageFormattingService.getInstance().format(TextFormats.BOLD, message.content)
    const embed = new MessageEmbed({
      color: EmbedColorsEnum.INFO,
      title: formattedCharacterName,
      description: `Pleased to meet them... I'm sure we're gonna get along. What will be their foremost stat?`
    })
    DisplayMessageService.getInstance().message(message, embed)
  }

  public setCharacterFirstBonus(message: Message): void {
    const memberId = message.author.id

    StateManagerService.getInstance().setBotState(memberId, {
      memberId,
      state: {
        name: StateNamesEnum.CHARACTER_CREATION,
        step: 3,
        data: `${stateFound.state.data},${message.content},`
      }
    })

    const formattedCharacterFisrtStatBonus = MessageFormattingService.getInstance().format(TextFormats.ITALIC_BOLD, message.content)
    const embed = new MessageEmbed({
      color: EmbedColorsEnum.INFO,
      title: formattedCharacterFisrtStatBonus,
      description: `So, they will be proficient in that field, I hope they will have a good use of it.`
    })
    DisplayMessageService.getInstance().message(message, embed)
  }
}
