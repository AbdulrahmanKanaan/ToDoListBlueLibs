import { Event } from "@bluelibs/core";
import { ObjectId } from "@bluelibs/ejson";

export interface ITodoDeletedEventData {
  todoId: ObjectId;
}

export class TodoDeletedEvent extends Event<ITodoDeletedEventData> {}
