import * as React from "react";
import { Smart } from "@bluelibs/smart";
import { ToDo } from "@root/api.types";
import { Inject } from "@bluelibs/core";
import { ToDosCollection } from "@bundles/UIAppBundle/collections";
import { GuardianSmart } from "@bluelibs/x-ui";
import { ObjectId } from "@bluelibs/ejson";

interface IState {
  todos: ToDo[];
  loading: boolean;
  error: string;
  message: string;
}

const initialState: IState = {
  todos: [],
  loading: false,
  message: "",
  error: "",
};

const ToDoContext = React.createContext(null);

export default class ToDoModel extends Smart<IState> {
  state: IState = { ...initialState };

  @Inject()
  todoCollection: ToDosCollection;

  @Inject()
  guardian: GuardianSmart;

  public async fetchToDos(groupId: string) {
    if (!this.guardian.state.initialised) return;
    const { user } = this.guardian.state;

    this.updateState({ loading: true });

    const todos = await this.todoCollection.find(
      {
        filters: {
          // userId: user._id,
          groupId: new ObjectId(groupId),
        },
      },
      { _id: 1, isDone: 1, order: 1, content: 1 }
    );

    this.updateState({ ...this.state, todos, loading: false });
  }

  static getContext = () => ToDoContext;
}
