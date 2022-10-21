import { useEffect, useState } from "react";

import { newSmart, smart } from "@bluelibs/smart";
import { HeaderTitle, Spinner } from "@bundles/UIAppBundle/components";
import { ToDo } from "@root/api.types";
import { Card, Col, message, Row } from "antd";
import { AddTodoForm, TodoList } from "./components";
import { ToDoModel } from "./models";
import { PositionMovement } from "@bundles/UIAppBundle/types";

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
    try {
      await api.deleteToDo(todo);
      message.warn("Todo removed!");
    } catch (error) {
      message.error("Couldn't delete todo item :(");
      throw error;
    }
  };

  const handleToggleTodoStatus = async (todo: ToDo): Promise<void> => {
    try {
      await api.toggleToDo(todo);
      message.info("Todo state updated!");
    } catch (err) {
      message.error("Couldn't update todo status :(");
      throw err;
    }
  };

  const handleTodoSort = async (
    todo: ToDo,
    position: PositionMovement
  ): Promise<void> => {
    await api.sortTodo(todo, position);
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
                  onTodoSort={handleTodoSort}
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
