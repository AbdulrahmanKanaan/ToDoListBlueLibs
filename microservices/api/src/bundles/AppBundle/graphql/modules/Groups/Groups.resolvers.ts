import { IResolverMap } from "@bluelibs/graphql-bundle";
import * as X from "@bluelibs/x-bundle";
import { GroupService } from "@bundles/AppBundle/services/Group.service";
import { GroupAuthorizeService } from "@bundles/AppBundle/services/GroupAuthorize.service";
import { argumentsMapper } from "@bundles/AppBundle/utils";
import { GroupsCollection } from "../../../collections/Groups/Groups.collection";

true;
export default {
  Query: [
    [],
    {
      GroupsFindOne: [
        X.ToService(GroupAuthorizeService, "authorizeQuery", argumentsMapper()),
        X.ToService(GroupService, "findOne", argumentsMapper()),
      ],
      GroupsFind: [
        X.ToService(GroupAuthorizeService, "authorizeQuery", argumentsMapper()),
        X.ToService(GroupService, "find", argumentsMapper()),
      ],
      GroupsCount: [
        X.ToService(GroupAuthorizeService, "authorizeQuery", argumentsMapper()),
        X.ToService(GroupService, "count", argumentsMapper()),
      ],
    },
  ],
  Mutation: [
    [],
    {
      GroupsInsertOne: [
        X.ToService(GroupAuthorizeService, "authorizeInsertion", argumentsMapper()),
        X.ToService(GroupService, "insertOne", argumentsMapper()),
      ],
      GroupsUpdateOne: [
        X.ToService(GroupService, "checkGroupExists", argumentsMapper()),
        X.ToService(GroupAuthorizeService, "authorizeMutation", argumentsMapper()),
        X.ToService(GroupService, "updateOne", argumentsMapper()),
      ],
      GroupsDeleteOne: [
        X.ToService(GroupService, "checkGroupExists", argumentsMapper()),
        X.ToService(GroupAuthorizeService, "authorizeMutation", argumentsMapper()),
        X.ToService(GroupService, "deleteOne", argumentsMapper()),
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
