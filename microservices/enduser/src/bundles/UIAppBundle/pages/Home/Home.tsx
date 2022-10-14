import React, { useState } from "react";
import useAuthRedirect from "@bundles/UIAppBundle/hooks/useAuthRedirect";
import {
  AddTodoForm,
  TodoItem,
  TodoList,
} from "@bundles/UIAppBundle/components";

import { Row, Col, Card, PageHeader, message } from "antd";
import { ToDo } from "@root/api.types";

export const HomePage = () => {
  useAuthRedirect();

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

  return (
    <>
      <Row
        justify="center"
        align="middle"
        gutter={[0, 20]}
        className="todos-container"
      >
        <Col
          xs={{ span: 23 }}
          sm={{ span: 23 }}
          md={{ span: 21 }}
          lg={{ span: 20 }}
          xl={{ span: 18 }}
        >
          <PageHeader
            title="Add Todo"
            subTitle="To add a todo, just fill the form below and click in add todo."
          />
        </Col>

        <Col
          xs={{ span: 23 }}
          sm={{ span: 23 }}
          md={{ span: 21 }}
          lg={{ span: 20 }}
          xl={{ span: 18 }}
        >
          <Card title="Create a new todo">
            <AddTodoForm onFormSubmit={handleFormSubmit} />
          </Card>
        </Col>

        <Col
          xs={{ span: 23 }}
          sm={{ span: 23 }}
          md={{ span: 21 }}
          lg={{ span: 20 }}
          xl={{ span: 18 }}
        >
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
