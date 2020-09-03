import _ from "lodash";
import version from "../../../../scripts/version";
import { Message, MessageEmbed } from "discord.js";
import { HelpsEnum } from "../../../enums/helps.enum";
import { EmbedColorsEnum } from "../../../enums/embed-colors.enum";
import { DisplayMessageService } from "../../../services/display-message/display-message.service";

export class HelpCommandService {
  private static _instance: HelpCommandService;

  public static getInstance(): HelpCommandService {
    if (_.isNil(HelpCommandService._instance)) {
      HelpCommandService._instance = new HelpCommandService();
    }
    return HelpCommandService._instance;
  }

  public async message(
    message: Message,
    helpToDisplay: HelpsEnum
  ): Promise<Message> {
    const embed = new MessageEmbed({
      color: EmbedColorsEnum.HELP,
    });
    if (helpToDisplay === HelpsEnum.HELP) {
      embed.title = `Welcome to Help`;
      // embed.description = `Your goal, as an inhabitant of the nether realm, is to create the most famous forge of all Hell: The Hellforge. In order to become that, here is what you can do to help you in your journey.`;
      (embed.description = `Lasses and lads, you're requiring the gentle help of me, the almighty Nano? Then, let me demonsplain things to you.`),
        (embed.fields = [
          {
            inline: false,
            name: `[prefix]`,
            value: `!h !hf !hell or !hellforge, nothing too complicated, I gave you a choice.`,
          },
          {
            inline: false,
            name: `[prefix] help`,
            value: `You're right there!`,
          },
          {
            inline: false,
            name: `[prefix] help character`,
            value: `Tells you what to do to be someone, or to retrive who you are.`,
          },
          {
            inline: false,
            name: `[prefix] help forge`,
            value: `Tells you what is your forge, how to manage it and how you can found one.`,
          },
          {
            inline: false,
            name: `[prefix] help smith`,
            value: `Tells you how you can hire any employee.`,
          },
          {
            inline: false,
            name: `[prefix] lore`,
            value: `Let me tell you a story...`,
          },
          {
            inline: false,
            name: `[prefix] character`,
            value: `Tells you who the Hell you think you are. It can be useful to remember sometimes, moreover if you actually exist. It will send you a mail in your private inbox.`,
          },
          {
            inline: false,
            name: `[prefix] character @mention`,
            value: `Tells you any public infos about that person. Does not include any gossip.`,
          },
          {
            inline: false,
            name: `[prefix] forge`,
            value: `Tells you all you need to know about your forge. Includes your hidden chocolates tablets. It will send you a mail in your private inbox.`,
          },
          {
            inline: false,
            name: `[prefix] forge @mention`,
            value: `Tells you any public infos about that person's forge. Does not include any gossip.`,
          },
          {
            inline: false,
            name: `[prefix] smith`,
            value: `Shows you if anyone wants to work in your forge, so you can hire them as ~~slaves~~ employees.`,
          },
        ]);
    }

    embed.footer = {
      text: `Version ${version}`,
    };

    return DisplayMessageService.getInstance().message(message, embed);
  }
}
