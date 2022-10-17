import {
  Collection,
  CollectionLinkConfig,
  CollectionTransformMap,
} from "@bluelibs/x-ui";
import { ToDo } from "@root/api.types";
import {
  GroupsCollection,
  UsersCollection,
} from "@bundles/UIAppBundle/collections";
import { ObjectId } from "@bluelibs/ejson";

export type { ToDo };

export class ToDosCollection extends Collection<ToDo> {
  getName() {
    return "ToDos";
  }

  getInputs() {
    return {
      insert: "ToDoInsertInput!",
      update: "ToDoUpdateInput!",
    };
  }

  // Return here the relations with other configs
  getLinks(): CollectionLinkConfig<ToDo>[] {
    return [
      {
        collection: () => GroupsCollection,
        name: "group",
        field: "groupId",
      },
      {
        collection: () => UsersCollection,
        name: "user",
        field: "userId",
      },
    ];
  }

  // Return here how you want to transform certain fields
  getTransformMap(): CollectionTransformMap<ToDo> {
    return {};
  }
}
