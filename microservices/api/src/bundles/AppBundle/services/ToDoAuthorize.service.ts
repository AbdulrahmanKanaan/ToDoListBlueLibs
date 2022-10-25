import { ContainerInstance, Service } from "@bluelibs/core";
import { ObjectId } from "@bluelibs/ejson";
import { GroupsCollection, ToDosCollection } from "../collections";
import { NotAuthorizedException } from "../exceptions";
import { ResolverArguments } from "../types";
import { GroupAuthorizeService } from "./GroupAuthorize.service";
import { UserService } from "./User.service";

@Service()
export class ToDoAuthorizeService {
  constructor(
    protected readonly container: ContainerInstance,
    protected readonly toDosCollection: ToDosCollection,
    protected readonly usersService: UserService,
    protected readonly groupAuthorizeService: GroupAuthorizeService
  ) {}

  public async authorizeQuery({ userId, args }: ResolverArguments) {
    const isAdmin = await this.usersService.isAdmin(userId);
    const filters = args?.query?.filters ?? {};
    const options = args?.query?.options ?? {};
    const query = {
      filters: {
        ...filters,
        ...(isAdmin ? {} : { userId }),
      },
      options,
    };
    return { query };
  }

  public async authorizeInsertion({ userId, args }: ResolverArguments) {
    // check if the user has admin role
    const isAdmin = await this.usersService.isAdmin(userId);
    // check if the inserted todo belongs to the user
    const documentUserId = args.document.userId;
    const isTodoBelongsToUser = userId.equals(documentUserId);
    // check if the group also belongs to the user
    const documentGroupId = args.document.groupId;
    const isGroupBelongsToUser = await this.groupAuthorizeService.isGroupBelongsToUser(
      documentGroupId,
      userId
    );
    // throw error JIC
    console.log({ isAdmin, isGroupBelongsToUser, isTodoBelongsToUser });
    if (!isAdmin && !(isTodoBelongsToUser && isGroupBelongsToUser)) {
      throw new NotAuthorizedException({
        message: "Cannot add a todo for another user",
      });
    }
  }

  public async authorizeMutation(
    { userId, args }: ResolverArguments,
    idResolver: (args: any) => any | Promise<any> = (args) => args._id
  ) {
    const isAdmin = await this.usersService.isAdmin(userId);
    const todoId = await idResolver(args);
    const isTodoBelongsToUser = this.isTodoBelongsToUser(todoId, userId);
    if (!isAdmin && !isTodoBelongsToUser) {
      throw new NotAuthorizedException({
        message: "cannot mutate todos for another user",
      });
    }
  }

  private async isTodoBelongsToUser(todoId: ObjectId, userId: ObjectId): Promise<boolean> {
    const todo = await this.toDosCollection.findOne({ _id: todoId });
    console.log(todo);
    const todoUserId = todo.userId;
    return userId.equals(todoUserId);
  }
}
