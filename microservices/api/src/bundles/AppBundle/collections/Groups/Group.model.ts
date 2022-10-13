export * from "./Group.model.base";
import { Schema, Is, a, an } from "@bluelibs/validator-bundle";
import { Group as BaseGroup } from "./Group.model.base";

@Schema()
export class Group extends BaseGroup {
  // You can extend the base here
}
