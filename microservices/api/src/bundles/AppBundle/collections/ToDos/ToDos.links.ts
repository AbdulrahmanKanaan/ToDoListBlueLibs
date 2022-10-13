import { UsersCollection } from "../Users/Users.collection";
import { GroupsCollection } from "../Groups/Groups.collection";
import { IBundleLinkCollectionOption } from "@bluelibs/mongo-bundle";

// Export link names as constants with type of: IBundleLinkCollectionOption, sample:
// export const myCustomLink: IBundleLinkCollectionOption = { ... }

export const group: IBundleLinkCollectionOption = {
  collection: () => GroupsCollection,
  field: "groupId",
};

export const user: IBundleLinkCollectionOption = {
  collection: () => UsersCollection,
  field: "userId",
};
