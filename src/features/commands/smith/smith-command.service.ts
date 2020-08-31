import _ from "lodash";
import { Smith } from "../../../classes/smith/smith";
import { ISmith } from "../../../types/character/smith";

export class SmithCommandService {
  private static _instance: SmithCommandService;

  public static getInstance(): SmithCommandService {
    if (_.isNil(SmithCommandService._instance)) {
      SmithCommandService._instance = new SmithCommandService();
    }
    return SmithCommandService._instance;
  }

  public async generate(): Promise<ISmith> {
    return new Smith().generateEntity();
  }
}
