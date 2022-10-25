import { Service, ContainerInstance } from "@bluelibs/core";
import { Group, GroupsCollection } from "../collections";
import { NotAuthorizedException } from "../exceptions";
import { ResolverArguments } from "../types";
import { UserService } from "./User.service";

@Service()
export class GroupAuthorizeService {
  constructor(
    protected readonly container: ContainerInstance,
    protected readonly collection: GroupsCollection,
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

  public async authorizeMutation({ args, userId }: ResolverArguments) {
    const isAdmin = await this.usersService.isAdmin(userId);
    const groupId = args._id;
    const document = await this.collection.findOne({ _id: groupId });
    const documentUserId = document.userId;
    if (!isAdmin && !userId.equals(documentUserId)) {
      throw new NotAuthorizedException({
        message: "cannot update or delete groups for another user",
      });
    }
  }
}
