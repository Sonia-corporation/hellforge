import _ from "lodash";
import { BotPrefixesEnum } from "../../enums/bot-prefixes.enum";

export class PrefixManagerService {
  private static _instance: PrefixManagerService;

  public static getInstance(): PrefixManagerService {
    if (_.isNil(PrefixManagerService._instance)) {
      PrefixManagerService._instance = new PrefixManagerService();
    }
    return PrefixManagerService._instance;
  }

  public getReadablePrefix(message: string): string {
    for (const prefix of Object.values(BotPrefixesEnum)) {
      if (prefix === this._getPrefix(message)) {
        return `${prefix} `;
      }
    }
    // Discord messages can't start with a space, so this prevents bot reacting when there isn't a valid prefix.
    return ` `;
  }

  private _getPrefix(message: string): string {
    return message.split(/ +/)[0];
  }
}
