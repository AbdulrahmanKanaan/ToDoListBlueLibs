import React, { useEffect, useState } from "react";

import { Card, List, Typography } from "antd";

import { AddTodoForm, TodoItem } from "..";
import { ToDo } from "@root/api.types";
import { ReactSortable } from "react-sortablejs";
import "./TodoList.scss";
import { PositionMovement } from "@bundles/UIAppBundle/types";

type ReactSortableProps = React.ComponentProps<typeof ReactSortable>;
interface ToDoListProps {
  todos: ToDo[];
  onTodoRemoval: (todo: ToDo) => Promise<void>;
  onTodoToggle: (todo: ToDo) => Promise<void>;
  onTodoSort: (todo: ToDo, position: PositionMovement) => Promise<void>;
}

const TodoList: React.FC<ToDoListProps> = ({
  todos,
  onTodoRemoval,
  onTodoToggle,
  onTodoSort,
}) => {
  const [todosList, setTodosList] = useState([
    ...todos.map((todo) => ({ ...todo, id: todo._id })),
  ]);

  const onSortDone: ReactSortableProps["onSort"] = ({ oldIndex, newIndex }) => {
    console.log(`${oldIndex} => ${newIndex}`);
    const todo = todosList.at(newIndex);
    onTodoSort(todo, { old: oldIndex, new: newIndex });
  };

  useEffect(() => {
    setTodosList(todos.map((todo) => ({ ...todo, id: todo._id })));
  }, [todos]);

  if (todos.length === 0) {
    return (
      <div className="nothing-message">
        <Card>
          <Typography.Text>There is nothing to do 😖</Typography.Text>
        </Card>
      </div>
    );
  }

  return (
    <>
      <ReactSortable
        list={todosList}
        setList={setTodosList}
        onSort={onSortDone}
        className="list-container"
        ghostClass="drop-area"
        animation={200}
      >
        {todosList.map((todoItem) => (
          <TodoItem
            key={todoItem.id}
            todo={todoItem}
            onTodoToggle={onTodoToggle}
            onTodoRemoval={onTodoRemoval}
          />
        ))}
      </ReactSortable>
    </>
  );
};

export default TodoList;
