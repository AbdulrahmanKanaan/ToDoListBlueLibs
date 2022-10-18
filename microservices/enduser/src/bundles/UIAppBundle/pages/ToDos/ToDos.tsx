import { useEffect, useState } from "react";

import { newSmart, smart } from "@bluelibs/smart";
import { HeaderTitle, Spinner } from "@bundles/UIAppBundle/components";
import { ToDo } from "@root/api.types";
import { Card, Col, message, Row } from "antd";
import { TodoList } from "./components";
import { ToDoModel } from "./models";

const ToDos: React.FunctionComponent<any> = ({ id: groupId }) => {
  const [todos, setTodos] = useState<ToDo[]>([]);

  const handleFormSubmit = (todo: any): void => {
    message.success("Todo added!");
  };

  const handleRemoveTodo = (todo: ToDo): void => {
    message.warn("Todo removed!");
  };

  const handleToggleTodoStatus = (todo: ToDo): void => {
    message.info("Todo state updated!");
  };

  const [api] = newSmart(ToDoModel);

  const { state } = api;

  useEffect(() => {
    api.fetchToDos(groupId);
  }, [api, groupId]);

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
            {state.loading ? (
              <Spinner spinning tip={"Loading todos"} />
            ) : (
              <TodoList
                todos={state.todos}
                onTodoRemoval={console.log}
                onTodoToggle={console.log}
              />
            )}
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default smart(ToDoModel)(ToDos);
