import { Service, ContainerInstance } from "@bluelibs/core";
import { ObjectId } from "@bluelibs/ejson";
import { Group, GroupsCollection } from "../collections";
import { NotAuthorizedException } from "../exceptions";
import { ResolverArguments } from "../types";
import { UserService } from "./User.service";

@Service()
export class GroupAuthorizeService {
  constructor(
    protected readonly container: ContainerInstance,
    protected readonly groupsCollection: GroupsCollection,
    protected readonly usersService: UserService
  ) {}

  public async authorizeQuery({ args, userId }: ResolverArguments) {
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

  public async authorizeInsertion({ args, userId }: ResolverArguments) {
    const isAdmin = await this.usersService.isAdmin(userId);
    const documentUserId = args.document.userId;
    if (!isAdmin && !userId.equals(documentUserId)) {
      throw new NotAuthorizedException({
        message: "Cannot add a group for another user",
      });
    }
  }

  public async authorizeMutation({ args, userId }: ResolverArguments<{ _id: ObjectId }>) {
    const isAdmin = await this.usersService.isAdmin(userId);
    const groupId = args._id;
    if (!isAdmin && !(await this.isGroupBelongsToUser(groupId, userId))) {
      throw new NotAuthorizedException({
        message: "cannot mutate groups for another user",
      });
    }
  }

  public async isGroupBelongsToUser(groupId: ObjectId, userId: ObjectId): Promise<boolean> {
    const group = await this.groupsCollection.findOne({ _id: groupId });
    const groupUserId = group.userId;
    return userId.equals(groupUserId);
  }
}
