import { Event } from "@bluelibs/core";
import { ObjectId } from "@bluelibs/ejson";

export interface ITodoSortedEventData {
  groupId: ObjectId;
  oldIndex: number;
  newIndex: number;
}

export class TodoSortedEvent extends Event<ITodoSortedEventData> {}
