import { Inject, Listener, On } from "@bluelibs/core";
import { ToDosCollection } from "../collections";
import { TodoSortedEvent as TodoBeforeSortedEvent } from "../events/TodoSorted.event";

export class ReorderTodosBeforeSortListener extends Listener {
  @Inject(() => ToDosCollection)
  todoCollection: ToDosCollection;

  @On(TodoBeforeSortedEvent, {})
  public async onTodoBeforeSortedEvent(e: TodoBeforeSortedEvent) {
    const { groupId, newIndex, oldIndex } = e.data;
    if (oldIndex < newIndex) {
      await this.todoCollection.updateMany(
        {
          groupId,
          order: { $gt: oldIndex, $lte: newIndex },
        },
        {
          $inc: { order: -1 },
        }
      );
    } else if (oldIndex > newIndex) {
      await this.todoCollection.updateMany(
        {
          groupId,
          order: { $gte: newIndex, $lt: oldIndex },
        },
        {
          $inc: { order: +1 },
        }
      );
    }
  }
}
