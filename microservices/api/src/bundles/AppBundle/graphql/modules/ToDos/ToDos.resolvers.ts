import * as X from "@bluelibs/x-bundle";
import { IResolverMap } from "@bluelibs/graphql-bundle";
import { ToDosCollection } from "../../../collections/ToDos/ToDos.collection";
import { ToDoAuthorizeService, ToDoService } from "@bundles/AppBundle/services";
import * as E from "@bundles/AppBundle/executors";
import { argumentsMapper } from "@bundles/AppBundle/utils";

true;
export default {
  Query: [
    [],
    {
      ToDosFindOne: [
        X.ToService(ToDoAuthorizeService, "authorizeQuery", argumentsMapper()),
        X.ToService(ToDoService, "findOne", argumentsMapper()),
      ],
      ToDosFind: [
        X.ToService(ToDoAuthorizeService, "authorizeQuery", argumentsMapper()),
        X.ToService(ToDoService, "find", argumentsMapper()),
      ],
      ToDosCount: [
        X.ToService(ToDoAuthorizeService, "authorizeQuery", argumentsMapper()),
        X.ToService(ToDoService, "count", argumentsMapper()),
      ],
    },
  ],
  Mutation: [
    [],
    {
      ToDosInsertOne: [
        X.ToService(ToDoAuthorizeService, "authorizeInsertion", argumentsMapper()),
        X.ToService(ToDoService, "insertOne", argumentsMapper()),
      ],
      ToDosUpdateOne: [
        X.ToService(ToDoService, "checkTodoExists", argumentsMapper()),
        X.ToService(ToDoAuthorizeService, "authorizeMutation", argumentsMapper()),
        X.ToService(ToDoService, "updateOne", argumentsMapper()),
      ],
      ToDosDeleteOne: [
        X.ToService(ToDoService, "checkTodoExists", argumentsMapper()),
        X.ToService(ToDoAuthorizeService, "authorizeMutation", argumentsMapper()),
        X.ToService(ToDoService, "deleteOne", argumentsMapper()),
      ],
      ToDoReorder: [
        X.ToService(
          ToDoService,
          "checkTodoExists",
          argumentsMapper((args) => args.input.todoId)
        ),
        X.ToService(
          ToDoAuthorizeService,
          "authorizeMutation",
          argumentsMapper((args) => args.input.todoId)
        ),
        X.ToService(ToDoService, "reorder", argumentsMapper()),
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
