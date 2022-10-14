import React from "react";
import { Tooltip, Tag, List, Button, Popconfirm, Switch } from "antd";
import { CloseOutlined, CheckOutlined } from "@ant-design/icons";

import "./styles.scss";
import { ToDo } from "@root/api.types";

interface ITodoItemProps {
  todo: ToDo;
  onTodoRemoval: (todo: ToDo) => void;
  onTodoToggle: (todo: ToDo) => void;
}

const TodoItem: React.FC<ITodoItemProps> = ({
  todo,
  onTodoRemoval,
  onTodoToggle,
}) => {
  return (
    <List.Item
      actions={[
        <Tooltip
          title={todo.isDone ? "Mark as uncompleted" : "Mark as completed"}
        >
          <Switch
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            onChange={() => onTodoToggle(todo)}
            defaultChecked={todo.isDone}
          />
        </Tooltip>,
        <Popconfirm
          title="Are you sure you want to delete?"
          onConfirm={() => {
            onTodoRemoval(todo);
          }}
        >
          <Button className="remove-todo-button" type="primary" danger>
            X
          </Button>
        </Popconfirm>,
      ]}
      className="list-item"
      key={todo._id.toString()}
    >
      <div className="todo-item">
        <Tag color={todo.isDone ? "cyan" : "red"} className="todo-tag">
          {todo.content}
        </Tag>
      </div>
    </List.Item>
  );
};

export default TodoItem;
