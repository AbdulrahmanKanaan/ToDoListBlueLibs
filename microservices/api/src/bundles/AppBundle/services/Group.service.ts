import {
  Service,
  Inject,
  EventManager,
  ContainerInstance,
} from "@bluelibs/core";
import { ObjectId } from "mongodb";
import { GroupsCollection } from "../collections";

@Service()
export class GroupService {
  constructor(
    protected readonly container: ContainerInstance,
    protected readonly eventManager: EventManager
  ) {}

  public async find(input, userId) {
    const groupsCollection = this.container.get(GroupsCollection);
    const userGroups = await groupsCollection
      .find({
        userId: userId,
      })
      .toArray();
    return userGroups;
  }

  public count() {
    throw new Error("Not implemented, yet.");
  }
}
