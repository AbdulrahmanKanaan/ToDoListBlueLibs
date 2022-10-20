export default /* GraphQL */ `
  input ToDoReorderInput {
    todoId: ObjectId!
    old: Int!
    new: Int!
  }
`;
