import * as X from "@bluelibs/x-bundle";
import { IResolverMap } from "@bluelibs/graphql-bundle";
import { ToDoInsertInput, ToDoUpdateInput } from "../../../services/inputs";
import { ToDosCollection } from "../../../collections/ToDos/ToDos.collection";
import { ToDoService } from "@bundles/AppBundle/services";

true;
export default {
  Query: [
    [],
    {
      ToDosFindOne: [X.ToNovaOne(ToDosCollection)],
      ToDosFind: [
        (_, args, ctx) => {
          console.log(args);
        },
        X.ToNova(ToDosCollection),
      ],
      ToDosCount: [X.ToCollectionCount(ToDosCollection)],
    },
  ],
  Mutation: [
    [],
    {
      ToDosInsertOne: [
        X.ToModel(ToDoInsertInput, { field: "document" }),
        X.Validate({ field: "document" }),
        X.ToDocumentInsert(ToDosCollection),
        X.ToNovaByResultID(ToDosCollection),
      ],
      ToDosUpdateOne: [
        X.ToModel(ToDoUpdateInput, { field: "document" }),
        X.Validate({ field: "document" }),
        X.CheckDocumentExists(ToDosCollection),
        // @ts-ignore
        X.ToDocumentUpdateByID(ToDosCollection, null, ({ document }) => ({
          $set: document,
        })),
        X.ToNovaByResultID(ToDosCollection),
      ],
      ToDosDeleteOne: [
        X.CheckDocumentExists(ToDosCollection),
        X.ToDocumentDeleteByID(ToDosCollection),
      ],
      ToDoReorder: [X.ToService(ToDoService, "reorder")],
    },
  ],
  Subscription: {
    ToDosSubscription: {
      resolve: (payload) => payload,
      subscribe: [X.ToSubscription(ToDosCollection)],
    },
    ToDosSubscriptionCount: {
      resolve: (payload) => payload,
      subscribe: [X.ToSubscriptionCount(ToDosCollection)],
    },
  },
} as IResolverMap;
