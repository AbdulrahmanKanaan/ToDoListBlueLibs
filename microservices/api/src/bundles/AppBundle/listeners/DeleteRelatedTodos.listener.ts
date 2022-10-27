import { Inject, Listener, On } from "@bluelibs/core";
import { ToDosCollection } from "../collections";
import { GroupDeletedEvent } from "../events";

export class DeleteRelatedTodosListener extends Listener {
  @Inject(() => ToDosCollection)
  todosCollection: ToDosCollection;

  @On(GroupDeletedEvent, {})
  public async onGroupDeletedEvent(e: GroupDeletedEvent) {
    const { groupId, userId } = e.data;
    await this.todosCollection.deleteMany({ groupId }, { context: { userId } });
  }
}
