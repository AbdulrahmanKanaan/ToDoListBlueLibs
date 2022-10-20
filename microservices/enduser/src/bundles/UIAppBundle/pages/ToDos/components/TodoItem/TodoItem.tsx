import { DeleteOutlined, LoadingOutlined } from "@ant-design/icons";
import { Button, Checkbox, Popconfirm, Space, Tooltip, Typography } from "antd";
import React, { useCallback, useState } from "react";

import { ToDo } from "@root/api.types";
import "./TodoItem.scss";

interface ITodoItemProps {
  todo: ToDo;
  onTodoRemoval: (todo: ToDo) => Promise<void>;
  onTodoToggle: (todo: ToDo) => Promise<void>;
}

const TodoItem: React.FC<ITodoItemProps> = ({
  todo,
  onTodoRemoval,
  onTodoToggle,
}) => {
  const [loading, setLoading] = useState(false);
  const [isToggled, setIsToggled] = useState(todo.isDone);

  const deleteTodo = () => {
    setLoading(true);
    onTodoRemoval(todo);
  };

  const toggleTodo = () => {
    setIsToggled((oldIsToggled) => !oldIsToggled);
    onTodoToggle(todo);
  };

  return (
    <>
      <div
        className={`list-item list-item_${isToggled ? "checked" : "unchecked"}`}
      >
        <div className="item-content">
          <Space>
            <Tooltip
              title={isToggled ? "Mark as uncompleted" : "Mark as completed"}
            >
              <Checkbox defaultChecked={isToggled} onChange={toggleTodo} />
            </Tooltip>
            <Typography.Text>{todo.content}</Typography.Text>
          </Space>
        </div>
        <div className="item-actions">
          <Popconfirm
            title="Are you sure you want to delete?"
            onConfirm={deleteTodo}
            disabled={loading}
          >
            {/* <DragOutlined className="drag-handle" /> */}
            <Button type="primary" shape="circle" danger disabled={loading}>
              {loading ? <LoadingOutlined /> : <DeleteOutlined />}
            </Button>
          </Popconfirm>
        </div>
      </div>
    </>
  );
};

export default TodoItem;
