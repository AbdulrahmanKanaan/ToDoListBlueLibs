import { ToDosCollection } from "../ToDos/ToDos.collection";
import { GroupsCollection } from "../Groups/Groups.collection";
import { UsersCollection } from "./Users.collection";
import { IBundleLinkCollectionOption } from "@bluelibs/mongo-bundle";

// Export link names as constants with type of: IBundleLinkCollectionOption, sample:
// export const myCustomLink: IBundleLinkCollectionOption = { ... }

export const createdBy: IBundleLinkCollectionOption = {
  collection: () => UsersCollection,
  field: "createdById",
};

export const updatedBy: IBundleLinkCollectionOption = {
  collection: () => UsersCollection,
  field: "updatedById",
};

export const groups: IBundleLinkCollectionOption = {
  collection: () => GroupsCollection,
  inversedBy: "user",
};

export const todos: IBundleLinkCollectionOption = {
  collection: () => ToDosCollection,
  inversedBy: "user",
};
