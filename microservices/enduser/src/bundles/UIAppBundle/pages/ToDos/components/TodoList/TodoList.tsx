import React, { useEffect, useState } from "react";

import { Card, List, Typography } from "antd";

import { AddTodoForm, TodoItem } from "..";
import { ToDo } from "@root/api.types";
import { ReactSortable } from "react-sortablejs";
import "./TodoList.scss";

interface ToDoListProps {
  todos: ToDo[];
  onTodoRemoval: (todo: ToDo) => Promise<void>;
  onTodoToggle: (todo: ToDo) => Promise<void>;
}

const TodoList: React.FC<ToDoListProps> = ({
  todos,
  onTodoRemoval,
  onTodoToggle,
}) => {
  const [todosList, setTodosList] = useState([
    ...todos.map((todo) => ({ ...todo, id: todo._id })),
  ]);

  const onSortDone = ({ oldIndex, newIndex }) => {
    console.log(`${oldIndex} => ${newIndex}`);
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
          <div key={todoItem.id}>
            <TodoItem
              todo={todoItem}
              onTodoToggle={onTodoToggle}
              onTodoRemoval={onTodoRemoval}
            />
          </div>
        ))}
      </ReactSortable>
    </>
  );
};

export default TodoList;
