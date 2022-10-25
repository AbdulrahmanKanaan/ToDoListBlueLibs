import { Service, EventManager, ContainerInstance } from "@bluelibs/core";
import { ObjectId, toModel } from "@bluelibs/ejson";
import { DocumentNotFoundException } from "@bluelibs/mongo-bundle";
import { ValidatorService } from "@bluelibs/validator-bundle";
import { UserService } from ".";
import { ToDo, ToDosCollection } from "../collections";
import { TodoDeletedEvent } from "../events/TodoDeleted.event";
import { TodoSortedEvent } from "../events/TodoSorted.event";
import { ResolverArguments } from "../types";
import { ToDoInsertInput, ToDoUpdateInput } from "./inputs";

@Service()
export class ToDoService {
  constructor(
    protected readonly container: ContainerInstance,
    protected readonly eventManager: EventManager,
    protected readonly todoCollection: ToDosCollection,
    protected readonly validatorService: ValidatorService,
    protected readonly usersService: UserService
  ) {}

  public async findOne({ args, ast, carry }: ResolverArguments): Promise<Partial<ToDo>> {
    const query = this.extractQuery({ args, carry });
    const todo = await this.todoCollection.queryOneGraphQL(ast, query);
    if (!todo) {
      throw new DocumentNotFoundException();
    }
    return todo;
  }

  public async find({ args, ast, carry }: ResolverArguments): Promise<Partial<ToDo>[]> {
    const query = this.extractQuery({ args, carry });
    const userTodos = await this.todoCollection.queryGraphQL(ast, query);
    return userTodos;
  }

  public async count({ args, carry }: ResolverArguments): Promise<number> {
    const query = this.extractQuery({ args, carry });
    const userTodos = await this.todoCollection.count(query.filters, query.options);
    return userTodos;
  }

  public async insertOne({ args, userId, ast }: ResolverArguments): Promise<Partial<ToDo>> {
    const { document } = args;
    const model = toModel(ToDoInsertInput, document);
    await this.validatorService.validate(model);
    const result = await this.todoCollection.insertOne(model, {
      context: { userId },
    });
    const insertedId = result.insertedId;
    return await this.getTodoByResultId(insertedId, ast);
  }

  public async updateOne({ args, userId, ast }: ResolverArguments): Promise<Partial<ToDo>> {
    const { document, _id: todoId } = args;
    const model = toModel(ToDoUpdateInput, document);
    await this.validatorService.validate(model);
    await this.todoCollection.updateOne(
      { _id: todoId },
      { $set: document },
      { context: { userId } }
    );
    return await this.getTodoByResultId(todoId, ast);
  }

  public async deleteOne({ args, userId }: ResolverArguments): Promise<boolean> {
    const { _id: todoId } = args;
    await this.eventManager.emit(new TodoDeletedEvent({ todoId }));
    const result = await this.todoCollection.deleteOne({ _id: todoId }, { context: { userId } });
    return result.acknowledged;
  }

  public async reorder({ args }: ResolverArguments): Promise<ToDo> {
    const { todoId, old: oldIndex, new: newIndex } = args.input;

    const todo = await this.todoCollection.findOne({ _id: todoId });

    await this.eventManager.emit(
      new TodoSortedEvent({
        groupId: todo.groupId,
        newIndex,
        oldIndex,
      })
    );

    await this.todoCollection.updateOne(
      { _id: todoId },
      {
        $set: { order: newIndex },
      }
    );

    todo.order = newIndex;

    return todo;
  }

  public async checkTodoExists(
    { args }: ResolverArguments,
    idResolver: (args: any) => any | Promise<any> = (args) => args._id
  ): Promise<void> {
    const todoId = await idResolver(args);
    const isExists = !!(await this.todoCollection.findOne(
      { _id: todoId },
      { projection: { _id: 1 } }
    ));
    if (!isExists) {
      throw new DocumentNotFoundException();
    }
  }

  private async getTodoByResultId(id: ObjectId, ast: any) {
    const todo = await this.todoCollection.queryOneGraphQL(ast, {
      filters: {
        _id: id,
      },
    });
    return todo;
  }

  private extractQuery({ carry, args }) {
    const query = carry && "query" in carry ? carry.query : args;
    return query;
  }
}
