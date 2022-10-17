import React, { useEffect } from "react";
import { useState } from "react";
import { AddTodoForm, TodoList } from "@bundles/UIAppBundle/components";

import { Row, Col, Card, PageHeader, message, Space } from "antd";
import { ToDo } from "@root/api.types";
import { use, useData } from "@bluelibs/x-ui";
import { GroupsCollection } from "@bundles/UIAppBundle/collections";
import { useAppGuardian } from "@bundles/UIAppBundle/services/AppGuardian";

export const Groups = () => {
  const [todos, setTodos] = useState<ToDo[]>([]);

  const handleFormSubmit = (todo: any): void => {
    message.success("Todo added!");
    setTodos((oldToDos) => [
      ...oldToDos,
      {
        content: todo.name,
        isDone: false,
        order: 1,
        group: null,
        groupId: null,
        user: null,
        userId: null,
        _id: Math.random(),
      },
    ]);
  };

  const handleRemoveTodo = (todo: ToDo): void => {
    message.warn("Todo removed!");
  };

  const handleToggleTodoStatus = (todo: ToDo): void => {
    message.info("Todo state updated!");
  };

  const {
    state: { user },
  } = useAppGuardian();

  const { data, error, isLoading } = useData(
    GroupsCollection,
    {
      filters: {
        userId: user?._id,
      },
    },
    { _id: 1, title: 1, userId: 1 }
  );

  return (
    <>
      <Row justify="center">
        <Col span={18}>
          <Space direction="vertical" style={{ width: "100%" }}>
            <PageHeader
              title="Create Group"
              // subTitle="To add a todo, just fill the form below and click in add todo."
            />

            <Card title="Create a new todo">
              <AddTodoForm onFormSubmit={handleFormSubmit} />
            </Card>
          </Space>
        </Col>
      </Row>
      <br />
      <Row
        justify="center"
        align="middle"
        gutter={[0, 20]}
        className="todos-container"
      >
        <Col span={18}>
          <Card title="Todo List">
            <TodoList
              todos={todos}
              onTodoRemoval={handleRemoveTodo}
              onTodoToggle={handleToggleTodoStatus}
            />
          </Card>
        </Col>
      </Row>
      );
    </>
  );
};
