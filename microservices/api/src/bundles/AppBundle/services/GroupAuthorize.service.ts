import {
  Service,
  Inject,
  EventManager,
  ContainerInstance,
} from "@bluelibs/core";

@Service()
export class GroupAuthorizeService {
  constructor(protected readonly container: ContainerInstance) {}

  public create() {
    throw new Error("Not implemented, yet.");
  }
  public update() {
    throw new Error("Not implemented, yet.");
  }
  public delete() {
    throw new Error("Not implemented, yet.");
  }
}
