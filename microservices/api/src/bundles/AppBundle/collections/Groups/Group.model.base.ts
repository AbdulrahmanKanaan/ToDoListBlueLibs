/** @overridable */
import { ObjectId } from "@bluelibs/ejson";
import { Schema, Is, a, an } from "@bluelibs/validator-bundle";
import { ToDo } from "../";
import { User } from "../";

@Schema()
export class Group {
  @Is(an.objectId())
  _id?: ObjectId;

  @Is(a.string().required())
  title: string;

  todos: ToDo[] = [];

  user: User;

  @Is(an.objectId().required())
  userId: ObjectId;
}
