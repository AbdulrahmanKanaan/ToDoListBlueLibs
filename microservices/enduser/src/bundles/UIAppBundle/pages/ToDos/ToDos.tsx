import { useEffect, useState } from "react";

import { newSmart, smart } from "@bluelibs/smart";
import { HeaderTitle, Spinner } from "@bundles/UIAppBundle/components";
import { ToDo } from "@root/api.types";
import { Card, Col, message, Row } from "antd";
import { AddTodoForm, TodoList } from "./components";
import { ToDoModel } from "./models";

const ToDos: React.FunctionComponent<any> = ({ id: groupId }) => {
  const [api] = newSmart(ToDoModel);

  const { loading, insertLoading, todos } = api.state;

  const handleAddTodo = async ({
    content,
  }: {
    content: string;
  }): Promise<void> => {
    const todo: Partial<ToDo> = {
      content,
      groupId,
      isDone: false,
    };
    await api.createToDo(todo);
    message.success("Todo added!");
  };

  const handleRemoveTodo = async (todo: ToDo): Promise<void> => {
    await api
      .deleteToDo(todo)
      .then(() => message.warn("Todo removed!"))
      .catch((err) => message.error("Couldn't delete todo item :("));
  };

  const handleToggleTodoStatus = async (todo: ToDo): Promise<void> => {
    await api
      .toggleToDo(todo)
      .then(() => message.info("Todo state updated!"))
      .catch(() => message.error("Couldn't update todo status :("));
  };

  useEffect(() => {
    api.fetchToDos(groupId);
  }, [api, groupId]);

  useEffect(() => {
    console.log(todos);
  }, [todos]);

  return (
    <>
      <HeaderTitle title="😆 AMAZING TO DO LIST 😆" />
      <br />
      <Row
        justify="center"
        align="middle"
        gutter={[0, 20]}
        className="todos-container"
      >
        <Col span={18}>
          <Card title="To Do List">
            {loading ? (
              <Spinner spinning tip={"Loading todos"} />
            ) : (
              <>
                <TodoList
                  todos={todos}
                  onTodoRemoval={handleRemoveTodo}
                  onTodoToggle={handleToggleTodoStatus}
                />
                <AddTodoForm onFormSubmit={handleAddTodo} />
              </>
            )}
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default smart(ToDoModel)(ToDos);
