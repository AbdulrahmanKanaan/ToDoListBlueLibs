import * as X from "@bluelibs/x-bundle";
import { IResolverMap } from "@bluelibs/graphql-bundle";
import { GroupInsertInput, GroupUpdateInput } from "../../../services/inputs";
import { GroupsCollection } from "../../../collections/Groups/Groups.collection";
import { GroupService } from "@bundles/AppBundle/services/Group.service";
import * as E from "@bundles/AppBundle/executors";

true;
export default {
  Query: [
    [],
    {
      GroupsFindOne: [X.ToNovaOne(GroupsCollection)],
      // GroupsFind: [
      //   X.ToNova(GroupsCollection, (_, args, ctx, info) => ({
      //     filters: {
      //       userId: ctx.userId,
      //     },
      //   })),
      // ],
      GroupsFind: [
        X.ToService(GroupService, "find", (args, ctx) => [args, ctx.userId]),
      ],
      GroupsCount: [X.ToCollectionCount(GroupsCollection)],
    },
  ],
  Mutation: [
    [],
    {
      GroupsInsertOne: [
        E.AuthorizeInsertion({ message: "Cannot add a group for another user" }),
        X.ToModel(GroupInsertInput, { field: "document" }),
        X.Validate({ field: "document" }),
        X.ToDocumentInsert(GroupsCollection),
        X.ToNovaByResultID(GroupsCollection),
      ],
      GroupsUpdateOne: [
        X.ToModel(GroupUpdateInput, { field: "document" }),
        X.Validate({ field: "document" }),
        X.CheckDocumentExists(GroupsCollection),
        // @ts-ignore
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
