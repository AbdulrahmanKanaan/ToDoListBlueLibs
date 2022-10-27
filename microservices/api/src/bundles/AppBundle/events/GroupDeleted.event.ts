import { Event } from "@bluelibs/core";
import { ObjectId } from "@bluelibs/ejson";

export interface IGroupDeletedEventData {
  groupId: ObjectId;
  userId: ObjectId;
}

export class GroupDeletedEvent extends Event<IGroupDeletedEventData> {}
