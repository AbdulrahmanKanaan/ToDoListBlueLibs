import {
  Service,
  Inject,
  EventManager,
  ContainerInstance,
} from "@bluelibs/core";
import { PermissionService, UserId } from "@bluelibs/security-bundle";
import { RegistrationInput, XAuthService } from "@bluelibs/x-auth-bundle";

type RegistrationOutput = {
  token: string;
  userId: UserId;
};

@Service()
export class AuthService extends XAuthService {
  async register(input: RegistrationInput): Promise<RegistrationOutput> {
    const { userId, token } = await super.register(input);
    this.securityService.setRoles(userId, ["END_USER"]);
    return {
      userId,
      token,
    };
  }
}
