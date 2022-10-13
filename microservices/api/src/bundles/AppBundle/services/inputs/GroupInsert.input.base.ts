/** @overridable */
import { ObjectId } from "@bluelibs/ejson";
import { Schema, Is, a, an } from "@bluelibs/validator-bundle";

@Schema()
export class GroupInsertInput {
  @Is(a.string().required())
  title: string;

  @Is(an.objectId().required())
  userId: ObjectId;
}
