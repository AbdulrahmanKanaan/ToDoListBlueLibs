import { Service, ContainerInstance } from "@bluelibs/core";
import { ObjectId } from "@bluelibs/ejson";
import { PermissionService } from "@bluelibs/security-bundle";
import { UserRole, UsersCollection } from "../collections";

@Service()
export class UserService {
  constructor(
    protected readonly container: ContainerInstance,
    protected readonly permissionService: PermissionService,
    protected readonly usersCollection: UsersCollection
  ) {}

  public async isAdmin(userId: ObjectId): Promise<boolean> {
    return await this.permissionService.hasRole(userId, UserRole.ADMIN);
  }
}
