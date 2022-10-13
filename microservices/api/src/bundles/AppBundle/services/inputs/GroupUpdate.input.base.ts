/** @overridable */
import { ObjectId } from "@bluelibs/ejson";
import { Schema, Is, a, an } from "@bluelibs/validator-bundle";

@Schema()
export class GroupUpdateInput {
  @Is(a.string().nullable())
  title?: string;

  @Is(an.objectId().nullable())
  userId?: ObjectId;
}
