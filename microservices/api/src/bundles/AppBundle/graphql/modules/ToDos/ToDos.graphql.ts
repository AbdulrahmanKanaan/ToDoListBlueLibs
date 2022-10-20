export default /* GraphQL */ `
  type Query {
    ToDosFindOne(query: QueryInput): ToDo
    ToDosFind(query: QueryInput): [ToDo]!
    ToDosCount(query: QueryInput): Int!
  }

  type Mutation {
    ToDosInsertOne(document: ToDoInsertInput!): ToDo
    ToDosUpdateOne(_id: ObjectId!, document: ToDoUpdateInput!): ToDo!
    ToDosDeleteOne(_id: ObjectId!): Boolean
    ToDoReorder(input: ToDoReorderInput!): ToDo
  }

  type Subscription {
    ToDosSubscription(body: EJSON): SubscriptionEvent
    ToDosSubscriptionCount(filters: EJSON): SubscriptionCountEvent
  }
`;
