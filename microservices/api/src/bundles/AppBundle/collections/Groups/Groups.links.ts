import { UsersCollection } from "../Users/Users.collection";
import { ToDosCollection } from "../ToDos/ToDos.collection";
import { IBundleLinkCollectionOption } from "@bluelibs/mongo-bundle";

// Export link names as constants with type of: IBundleLinkCollectionOption, sample:
// export const myCustomLink: IBundleLinkCollectionOption = { ... }

export const todos: IBundleLinkCollectionOption = {
  collection: () => ToDosCollection,
  inversedBy: "group",
};

export const user: IBundleLinkCollectionOption = {
  collection: () => UsersCollection,
  field: "userId",
};
