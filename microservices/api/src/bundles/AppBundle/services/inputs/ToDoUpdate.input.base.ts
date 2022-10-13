/** @overridable */
import { ObjectId } from "@bluelibs/ejson";
import { Schema, Is, a, an } from "@bluelibs/validator-bundle";

@Schema()
export class ToDoUpdateInput {
  @Is(a.string().nullable())
  content?: string;

  @Is(an.objectId().nullable())
  groupId?: ObjectId;

  @Is(a.boolean().nullable())
  isDone?: boolean;

  @Is(a.number().nullable())
  order?: number;

  @Is(an.objectId().nullable())
  userId?: ObjectId;
}
