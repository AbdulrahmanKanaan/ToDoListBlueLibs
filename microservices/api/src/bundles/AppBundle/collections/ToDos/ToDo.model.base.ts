/** @overridable */
import { ObjectId } from "@bluelibs/ejson";
import { Schema, Is, a, an } from "@bluelibs/validator-bundle";
import { Group } from "../";
import { User } from "../";

@Schema()
export class ToDo {
  @Is(an.objectId())
  _id?: ObjectId;

  @Is(a.string().required())
  content: string;

  group: Group;

  @Is(an.objectId().required())
  groupId: ObjectId;

  @Is(a.boolean().required())
  isDone: boolean;

  @Is(a.number().required())
  order: number;

  user: User;

  @Is(an.objectId().required())
  userId: ObjectId;
}
