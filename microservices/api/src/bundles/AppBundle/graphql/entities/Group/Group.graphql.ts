export default /* GraphQL */ `
  type Group {
    _id: ObjectId
    title: String!
    todos: [ToDo]!
    user: User!
    userId: ObjectId!
  }
`;
