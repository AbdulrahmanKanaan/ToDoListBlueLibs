import { Schema, Is, a, an } from "@bluelibs/validator-bundle";
import { GroupInsertInput as BaseGroupInsertInput } from "./GroupInsert.input.base";

@Schema()
export class GroupInsertInput extends BaseGroupInsertInput {
  // You can extend the base here
}
