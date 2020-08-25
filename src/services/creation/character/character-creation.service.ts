import _ from "lodash"
import { Message } from "discord.js"
import { TextFormats } from "../../../enums/text-formats.enum"
import { DisplayMessageService } from "../../display-message/display-message.service"
import { CharacterService } from "../../character/character.service"
import { MessageFormattingService } from "../../message-formating/message-formatting.service"
import { StateManagerService } from "../../state-manager/state-manager.service"
import { StateNamesEnum } from "../../../enums/state-names.enum"

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
    .then((characterFound) => {
      if (!characterFound) {
        const currentState = StateManagerService.getInstance().getBotState()

        if (currentState.state === 'Normal') {
          StateManagerService.getInstance().setBotState(message.author.id, StateNamesEnum.CHARACTER_CREATION, 1, `${message.author.id},`) // The data from the state will have a CSV format value.
          DisplayMessageService.getInstance().message(message, `Welcome to the character creation. Type in the name of your character below. You can type 'exit' to quit this mode, or 'save' to end the process but still continue it later.`)
        }
      }
      else {
        const boldCharacterName = MessageFormattingService.getInstance().format(TextFormats.BOLD, characterFound.name)
        DisplayMessageService.getInstance().message(message, `You already have a character, their name is: ${boldCharacterName}`)
      }
    })
  }

  public setCharacterName(message: Message): void {
    const newData = `${StateManagerService.getInstance().getBotState().data}${message.content},`
    StateManagerService.getInstance().setBotState(message.author.id, StateNamesEnum.CHARACTER_CREATION, 2, newData)
    const formattedCharacterName = MessageFormattingService.getInstance().format(TextFormats.BOLD, message.content)
    DisplayMessageService.getInstance().message(message, `Pleased to meet ${formattedCharacterName}... What will be their foremost stat?`)
  }

  public setCharacterFirstBonus(message: Message): void {
    const newData = `${StateManagerService.getInstance().getBotState().data}${message.content},`
    StateManagerService.getInstance().setBotState(message.author.id, StateNamesEnum.CHARACTER_CREATION, 3, newData)
    const formattedCharacterFisrtStatBonus = MessageFormattingService.getInstance().format(TextFormats.ITALIC_BOLD, message.content)
    DisplayMessageService.getInstance().message(message, `So, they will be proficient at ${formattedCharacterFisrtStatBonus}, I hope they will have a good use of it.`)
  }
}
