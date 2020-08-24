import _ from "lodash"
import { Prefixes } from '../../prefixes'

export class PrefixManagerService {
  private static _instance: PrefixManagerService

  public static getInstance(): PrefixManagerService {
    if(_.isNil(PrefixManagerService._instance)) {
      PrefixManagerService._instance = new PrefixManagerService()
    }
    return PrefixManagerService._instance
  }

  private _getPrefix(message: string): string {
    return message.split(/ +/)[0]
  }

  public setPrefix(message: string): string {
    for (const prefixIndex in Prefixes) {
      if (Prefixes[prefixIndex] === this._getPrefix(message)) return `${Prefixes[prefixIndex]} `
    }
    return ''
  }
}