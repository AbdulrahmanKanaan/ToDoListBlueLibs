import { useEffect } from "react";

import { newSmart, smart } from "@bluelibs/smart";
import { HeaderTitle, Layout, Spinner } from "@bundles/UIAppBundle/components";
import { ToDo } from "@root/api.types";
import { Button, Card, Col, message, Row, Space } from "antd";
import { AddTodoForm, TodoList } from "./components";
import { ToDoModel } from "./models";
import { PositionMovement } from "@bundles/UIAppBundle/types";
import { useRouter } from "@bluelibs/x-ui";
import { GROUPS } from "../routes";

const ToDos: React.FunctionComponent<any> = ({ id: groupId }) => {
  const router = useRouter();

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
    try {
      await api.createToDo(todo);
      message.success("Todo added!");
    } catch (error) {
      message.error(error.message);
    }
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
      <Layout>
        <Space direction="vertical" size={"large"} style={{ width: "100%" }}>
          <HeaderTitle title="😆 AMAZING TO DO LIST 😆" />
          <Button onClick={() => router.go(GROUPS)}>Return To Groups</Button>
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
        </Space>
      </Layout>
    </>
  );
};

export default smart(ToDoModel)(ToDos);
