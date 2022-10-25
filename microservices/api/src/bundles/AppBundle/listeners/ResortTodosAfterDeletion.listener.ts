import { Inject, Listener, On } from "@bluelibs/core";
import { ToDosCollection } from "../collections";
import { TodoDeletedEvent } from "../events/TodoDeleted.event";

export class ResortTodosAfterDeletionListener extends Listener {
  @Inject(() => ToDosCollection)
  todoCollection: ToDosCollection;

  @On(TodoDeletedEvent, {})
  public async onTodoDeletedEvent(e: TodoDeletedEvent) {
    const { todoId } = e.data;
    const todo = await this.todoCollection.findOne({ _id: todoId });
    await this.todoCollection.updateMany(
      { groupId: todo.groupId, order: { $gte: todo.order } },
      { $inc: { order: -1 } }
    );
  }
}
