import {
  Service,
  EventManager,
  ContainerInstance,
} from "@bluelibs/core";
import { ToDosCollection } from "../collections";

@Service()
export class ToDoService {

  constructor(
    protected readonly container: ContainerInstance,
    protected readonly eventManager: EventManager,
    protected readonly todoCollection: ToDosCollection
  ) {}

  public async reorder(input, userId) {
    const { todoId, old: oldIndex, new: newIndex } = input;

    console.log(input, userId);

    const todoCollection = this.container.get(ToDosCollection);

    if (oldIndex < newIndex) {
      await todoCollection.updateMany(
        {
          order: {
            $gt: oldIndex,
            $lte: newIndex,
          },
        },
        {
          $inc: {
            order: -1,
          },
        }
      );
    } else if (oldIndex > newIndex) {
      await todoCollection.updateMany(
        {
          order: {
            $gte: newIndex,
            $lt: oldIndex,
          },
        },
        {
          $inc: {
            order: +1,
          },
        }
      );
    }

    await todoCollection.updateOne(
      {
        _id: todoId,
      },
      {
        $set: {
          order: newIndex,
        },
      }
    );

    const todo = await todoCollection.findOne({ _id: todoId });

    return todo;
  }

  public async fixOrderAfterDeletion(todoId) {
    const todoCollection = this.container.get(ToDosCollection);
    const todo = await todoCollection.findOne(todoId);
    await todoCollection.updateMany(
      { order: { $gte: todo.order } },
      { $inc: { order: -1 } }
    );
  }

  public async find (args, userId) {
    console.log(this.todoCollection)
  }
}
