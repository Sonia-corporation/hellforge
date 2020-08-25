import _ from "lodash"
import { Message } from "discord.js"
import { TextFormats } from "../../../enums/text-formats.enum"
import { DisplayMessageService } from "../../display-message/display-message.service"
import { CharacterService } from "../../character/character.service"
import { MessageFormattingService } from "../../message-formating/message-formatting.service"
import { StateManagerService } from '../../state-manager/state-manager.service'

export class CharacterCreationService {
  private static _instance: CharacterCreationService

  public static getInstance(): CharacterCreationService {
    if(_.isNil(CharacterCreationService._instance)) {
      CharacterCreationService._instance = new CharacterCreationService()
    }
    return CharacterCreationService._instance
  }

  public init(message: Message) {
    CharacterService.getInstance().getEntity(message.author.id)
    .then((characterFound) => {
      if (!characterFound) {
        const currentState = StateManagerService.getInstance().getBotState()

        if (currentState.state === 'Normal') {
          StateManagerService.getInstance().setBotState('CharacterCreation', 1, `${message.author.id},`) // The data from the state will have a CSV format value.
          DisplayMessageService.getInstance().message(message, `Welcome to the character creation. Type in the name of your character below. You can type 'exit' to quit this mode, or 'save' to end the process but still continue it later.`)
        }
      }
      else {
        const boldCharacterName = MessageFormattingService.getInstance().format(TextFormats.BOLD, characterFound.name)
        DisplayMessageService.getInstance().message(message, `You already have a character, their name is: ${boldCharacterName}`)
      }
    })
  }

  public setCharacterName(message: Message) {
    const newData = StateManagerService.getInstance().getBotState().data + `${message.content},`
    StateManagerService.getInstance().setBotState('Normal', 0, newData) // TODO: Create step 2.
    const formattedCharacterName = MessageFormattingService.getInstance().format(TextFormats.BOLD, message.content)
    DisplayMessageService.getInstance().message(message, `Pleased to meet ${formattedCharacterName}... What will be their foremost stat?`)
  }
}