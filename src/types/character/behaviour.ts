import { SmithBehaviourNameEnum } from "../../enums/smith/behaviour-name";
import { SmithBehaviourDescriptionEnum } from "../../enums/smith/behaviour-description";

export interface IBehaviour {
  description: SmithBehaviourDescriptionEnum;
  name: SmithBehaviourNameEnum;
}
