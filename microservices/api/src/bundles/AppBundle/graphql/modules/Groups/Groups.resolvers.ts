import * as X from "@bluelibs/x-bundle";
import { IResolverMap } from "@bluelibs/graphql-bundle";
import { GroupInsertInput, GroupUpdateInput } from "../../../services/inputs";
import { GroupsCollection } from "../../../collections/Groups/Groups.collection";

true;
export default {
  Query: [
    [],
    {
      GroupsFindOne: [X.ToNovaOne(GroupsCollection)],
      GroupsFind: [X.ToNova(GroupsCollection)],
      GroupsCount: [X.ToCollectionCount(GroupsCollection)],
    },
  ],
  Mutation: [
    [],
    {
      GroupsInsertOne: [
        X.ToModel(GroupInsertInput, { field: "document" }),
        X.Validate({ field: "document" }),
        X.ToDocumentInsert(GroupsCollection),
        X.ToNovaByResultID(GroupsCollection),
      ],
      GroupsUpdateOne: [
        X.ToModel(GroupUpdateInput, { field: "document" }),
        X.Validate({ field: "document" }),
        X.CheckDocumentExists(GroupsCollection),
        X.ToDocumentUpdateByID(GroupsCollection, null, ({ document }) => ({
          $set: document,
        })),
        X.ToNovaByResultID(GroupsCollection),
      ],
      GroupsDeleteOne: [
        X.CheckDocumentExists(GroupsCollection),
        X.ToDocumentDeleteByID(GroupsCollection),
      ],
    },
  ],
  Subscription: {
    GroupsSubscription: {
      resolve: (payload) => payload,
      subscribe: [X.ToSubscription(GroupsCollection)],
    },
    GroupsSubscriptionCount: {
      resolve: (payload) => payload,
      subscribe: [X.ToSubscriptionCount(GroupsCollection)],
    },
  },
} as IResolverMap;
