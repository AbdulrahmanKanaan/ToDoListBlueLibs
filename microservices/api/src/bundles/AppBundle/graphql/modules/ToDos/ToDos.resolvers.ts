import * as X from "@bluelibs/x-bundle";
import { IResolverMap } from "@bluelibs/graphql-bundle";
import { ToDoInsertInput, ToDoUpdateInput } from "../../../services/inputs";
import { ToDosCollection } from "../../../collections/ToDos/ToDos.collection";
import { ToDoAuthorizeService, ToDoService } from "@bundles/AppBundle/services";
import * as E from "@bundles/AppBundle/executors";

true;
export default {
  Query: [
    [],
    {
      ToDosFindOne: [X.ToNovaOne(ToDosCollection)],
      ToDosFind: [X.ToNova(ToDosCollection)],
      ToDosCount: [X.ToCollectionCount(ToDosCollection)],
    },
  ],
  Mutation: [
    [],
    {
      ToDosInsertOne: [
        E.AuthorizeInsertion({ message: "Cannot insert for another user" }),
        X.ToModel(ToDoInsertInput, { field: "document" }),
        X.Validate({ field: "document" }),
        X.ToDocumentInsert(ToDosCollection),
        X.ToNovaByResultID(ToDosCollection),
      ],
      ToDosUpdateOne: [
        X.ToModel(ToDoUpdateInput, { field: "document" }),
        X.Validate({ field: "document" }),
        X.CheckDocumentExists(ToDosCollection),
        E.AuthorizeMutation(ToDosCollection),
        // @ts-ignore
        X.ToDocumentUpdateByID(ToDosCollection, null, ({ document }) => ({
          $set: document,
        })),
        X.ToNovaByResultID(ToDosCollection),
      ],
      ToDosDeleteOne: [
        X.CheckDocumentExists(ToDosCollection),
        E.AuthorizeMutation(ToDosCollection),
        X.ToDocumentDeleteByID(ToDosCollection),
      ],
      ToDoReorder: [
        X.CheckDocumentExists(ToDosCollection, (args) => args.input.todoId),
        E.AuthorizeMutation(ToDosCollection, {
          idResolver: (args) => args.input.todoId,
          message: "you don't have permissions to sort this list!",
        }),
        X.ToService(ToDoService, "reorder"),
      ],
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
