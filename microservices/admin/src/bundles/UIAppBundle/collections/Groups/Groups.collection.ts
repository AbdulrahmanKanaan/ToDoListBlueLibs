import {
  Collection,
  CollectionLinkConfig,
  CollectionTransformMap,
} from "@bluelibs/x-ui";
import { Group } from "@root/api.types";
import {
  ToDosCollection,
  UsersCollection,
} from "@bundles/UIAppBundle/collections";
import { ObjectId } from "@bluelibs/ejson";

export type { Group };

export class GroupsCollection extends Collection<Group> {
  getName() {
    return "Groups";
  }

  getInputs() {
    return {
      insert: "GroupInsertInput!",
      update: "GroupUpdateInput!",
    };
  }

  // Return here the relations with other configs
  getLinks(): CollectionLinkConfig<Group>[] {
    return [
      {
        collection: () => UsersCollection,
        name: "user",
        field: "userId",
      },
      {
        collection: () => ToDosCollection,
        name: "todos",
      },
    ];
  }

  // Return here how you want to transform certain fields
  getTransformMap(): CollectionTransformMap<Group> {
    return {};
  }
}
