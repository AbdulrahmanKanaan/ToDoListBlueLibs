import { Collection, Behaviors } from "@bluelibs/mongo-bundle";
import { Behaviors as XBehaviors } from "@bluelibs/x-bundle";
import * as links from "./Groups.links";
import * as reducers from "./Groups.reducers";
import { Group } from "./Group.model";

export class GroupsCollection extends Collection<Group> {
  static collectionName = "groups";
  static model = Group;

  static links = links;
  static reducers = reducers;

  static behaviors = [
    Behaviors.Timestampable(),

    Behaviors.Blameable(),

    Behaviors.Softdeletable(),

    XBehaviors.Live(),
  ];

  // Create an array of indexes
  static indexes = [
    { key: { isDeleted: 1 } },
    { key: { createdAt: 1 } },
    { key: { createdBy: 1 } },
  ];
}
