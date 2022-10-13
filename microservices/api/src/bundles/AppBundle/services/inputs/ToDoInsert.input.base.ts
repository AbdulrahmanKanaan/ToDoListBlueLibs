/** @overridable */
import { ObjectId } from "@bluelibs/ejson";
import { Schema, Is, a, an } from "@bluelibs/validator-bundle";

@Schema()
export class ToDoInsertInput {
  @Is(a.string().required())
  content: string;

  @Is(an.objectId().required())
  groupId: ObjectId;

  @Is(a.boolean().required())
  isDone: boolean;

  @Is(a.number().required())
  order: number;

  @Is(an.objectId().required())
  userId: ObjectId;
}
