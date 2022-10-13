export default /* GraphQL */ `
  input ToDoUpdateInput {
    content: String
    groupId: ObjectId
    isDone: Boolean
    order: Int
    userId: ObjectId
  }
`;
