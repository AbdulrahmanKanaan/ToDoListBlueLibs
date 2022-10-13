export default /* GraphQL */ `
  type Query {
    GroupsFindOne(query: QueryInput): Group
    GroupsFind(query: QueryInput): [Group]!
    GroupsCount(query: QueryInput): Int!
  }

  type Mutation {
    GroupsInsertOne(document: GroupInsertInput!): Group
    GroupsUpdateOne(_id: ObjectId!, document: GroupUpdateInput!): Group!
    GroupsDeleteOne(_id: ObjectId!): Boolean
  }

  type Subscription {
    GroupsSubscription(body: EJSON): SubscriptionEvent
    GroupsSubscriptionCount(filters: EJSON): SubscriptionCountEvent
  }
`;
