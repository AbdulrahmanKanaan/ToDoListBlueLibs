export * from "./ToDo.model.base";
import { Schema, Is, a, an } from "@bluelibs/validator-bundle";
import { ToDo as BaseToDo } from "./ToDo.model.base";

@Schema()
export class ToDo extends BaseToDo {
  // You can extend the base here
}
