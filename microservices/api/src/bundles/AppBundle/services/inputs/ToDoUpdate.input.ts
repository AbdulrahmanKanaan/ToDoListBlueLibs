import { Schema, Is, a, an } from "@bluelibs/validator-bundle";
import { ToDoUpdateInput as BaseToDoUpdateInput } from "./ToDoUpdate.input.base";

@Schema()
export class ToDoUpdateInput extends BaseToDoUpdateInput {
  // You can extend the base here
}
