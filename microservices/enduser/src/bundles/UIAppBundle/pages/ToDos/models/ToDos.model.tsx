import * as React from "react";
import { Smart } from "@bluelibs/smart";
import { ToDo } from "@root/api.types";
import { Inject } from "@bluelibs/core";
import { ToDosCollection } from "@bundles/UIAppBundle/collections";
import { ApolloClient, GuardianSmart } from "@bluelibs/x-ui";
import { ObjectId } from "@bluelibs/ejson";
import { PositionMovement } from "@bundles/UIAppBundle/types";
import { gql } from "@apollo/client";

interface IState {
  todos: ToDo[];
  loading: boolean;
  insertLoading: boolean;
  error: string;
  message: string;
}

const initialState: IState = {
  todos: [],
  loading: false,
  insertLoading: false,
  message: "",
  error: "",
};

const ToDoContext = React.createContext(null);

export default class ToDoModel extends Smart<IState> {
  state: IState = { ...initialState };

  @Inject()
  todoCollection: ToDosCollection;

  @Inject()
  client: ApolloClient;

  @Inject()
  guardian: GuardianSmart;

  public async fetchToDos(groupId: string, silent = false): Promise<void> {
    if (!this.guardian.state.initialised) return;

    const { user } = this.guardian.state;

    !silent && this.updateState({ loading: true });

    const todos = await this.todoCollection.find(
      {
        filters: {
          userId: user._id,
          groupId: new ObjectId(groupId),
        },
        options: {
          sort: {
            order: 1,
          },
        },
      },
      { _id: 1, isDone: 1, order: 1, content: 1, groupId: 1 }
    );

    this.updateState({ todos, loading: false });
  }

  public async createToDo(todo: Partial<ToDo>): Promise<void> {
    const { user } = this.guardian.state;

    const groupId = new ObjectId(todo.groupId);

    const order = await this.todoCollection.count({
      groupId,
    });

    const insertedTodo = await this.todoCollection.insertOne({
      ...todo,
      groupId,
      order,
      userId: user._id,
    });

    this.updateState({
      todos: [...this.state.todos, insertedTodo as ToDo],
    });
  }

  public async deleteToDo(todo: ToDo): Promise<void> {
    const ID = new ObjectId(todo._id);

    await this.todoCollection.deleteOne(ID);

    const newTodoList = this.state.todos.filter((todo) => !ID.equals(todo._id));

    this.updateState({
      todos: newTodoList,
    });
  }

  public async toggleToDo(todo: ToDo): Promise<void> {
    const ID = new ObjectId(todo._id);

    await this.todoCollection.updateOne(ID, {
      $set: {
        isDone: !todo.isDone,
      },
    });
  }

  public async sortTodo(todo: ToDo, position: PositionMovement): Promise<void> {
    const ID = new ObjectId(todo._id);
    // Sort on remote
    const mutation = gql`
      mutation ToDoReorder($input: ToDoReorderInput!) {
        ToDoReorder(input: $input) {
          _id
          content
        }
      }
    `;
    await this.client.mutate({
      mutation,
      variables: {
        input: {
          todoId: ID,
          old: position.old,
          new: position.new,
        },
      },
    });

    await this.fetchToDos(todo.groupId, true);
  }

  static getContext = () => ToDoContext;
}
