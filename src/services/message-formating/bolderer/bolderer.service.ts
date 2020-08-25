import _ from "lodash"

export class BoldererService {
  private static _instance: BoldererService

  public static getInstance(): BoldererService {
    if (_.isNil(BoldererService._instance)) {
      BoldererService._instance = new BoldererService()
    }
    return BoldererService._instance
  }

  public bold(text: string) {
    return `**${text}**`
  }
}
