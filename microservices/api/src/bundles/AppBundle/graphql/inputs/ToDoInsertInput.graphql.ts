export default /* GraphQL */ `
  input ToDoInsertInput {
    content: String!
    groupId: ObjectId!
    isDone: Boolean!
    order: Int!
    userId: ObjectId!
  }
`;
