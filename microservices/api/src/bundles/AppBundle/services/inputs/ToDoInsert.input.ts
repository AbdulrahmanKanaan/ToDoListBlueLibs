import { Schema, Is, a, an } from "@bluelibs/validator-bundle";
import { ToDoInsertInput as BaseToDoInsertInput } from "./ToDoInsert.input.base";

@Schema()
export class ToDoInsertInput extends BaseToDoInsertInput {
  // You can extend the base here
}
