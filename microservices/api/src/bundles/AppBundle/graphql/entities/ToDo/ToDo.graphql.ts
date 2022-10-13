export default /* GraphQL */ `
  type ToDo {
    _id: ObjectId
    content: String!
    group: Group!
    groupId: ObjectId!
    isDone: Boolean!
    order: Int!
    user: User!
    userId: ObjectId!
  }
`;
