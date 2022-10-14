import React from "react";

import { List } from "antd";

import { TodoItem } from "..";
import { ToDo } from "@root/api.types";

interface ToDoListProps {
  todos: ToDo[];
  onTodoRemoval: (todo: ToDo) => void;
  onTodoToggle: (todo: ToDo) => void;
}

const TodoList: React.FC<ToDoListProps> = ({
  todos,
  onTodoRemoval,
  onTodoToggle,
}) => (
  <List
    locale={{
      emptyText: "There's nothing to do :(",
    }}
    dataSource={todos}
    renderItem={(todo) => (
      <TodoItem
        todo={todo}
        onTodoToggle={onTodoToggle}
        onTodoRemoval={onTodoRemoval}
      />
    )}
    pagination={{
      position: "bottom",
      pageSize: 10,
    }}
  />
);

export default TodoList;
