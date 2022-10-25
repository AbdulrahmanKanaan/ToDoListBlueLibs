import { ContainerInstance, Service } from "@bluelibs/core";
import { ObjectId } from "@bluelibs/ejson";
import { ToDosCollection } from "../collections";
import { NotAuthorizedException } from "../exceptions";

@Service()
export class ToDoAuthorizeService {
  constructor(protected readonly container: ContainerInstance) {}

  public async authorizeCreate(input: AuthorizeInput) {
    const { userId, data, message } = input;
    if (!userId.equals(data.userId)) {
      throw new Error(message || "Cannot insert for another user");
    }
  }

  public async authorizeUpdate(input: AuthorizeInput) {
    this.authorizeMutation(input.userId, input.data.id);
  }

  public async authorizeDelete(input: AuthorizeInput<{ _id: ObjectId }>) {
    console.log(input);
    this.authorizeMutation(input.data._id, input.userId);
  }

  private async authorizeMutation(todoId: ObjectId, userId: ObjectId) {
    const todoCollection = this.container.get(ToDosCollection);
    const todo = await todoCollection.findOne({
      _id: todoId,
    });
    console.log(todo);
    throw new NotAuthorizedException(null);
  }
}

interface AuthorizeInput<T = any> {
  data: T;
  userId: ObjectId;
  message?: string;
}
