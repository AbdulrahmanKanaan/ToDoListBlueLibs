import React from "react";

import { use, useData, useRouter } from "@bluelibs/x-ui";
import { GroupsCollection } from "@bundles/UIAppBundle/collections";
import { HeaderTitle, Spinner } from "@bundles/UIAppBundle/components";
import { useAppGuardian } from "@bundles/UIAppBundle/services/AppGuardian";
import { Group, ToDo } from "@root/api.types";
import { Card, Col, message, Row } from "antd";
import { TODOS } from "../routes";
import { AddGroupForm, GroupsList } from "./components";

type AddGroupFormProps = React.ComponentProps<typeof AddGroupForm>;

export const Groups = () => {
  const router = useRouter();
  const groupsCollection = use(GroupsCollection);

  const {
    state: { user },
  } = useAppGuardian();

  const { data, error, isLoading } = useData(
    GroupsCollection,
    {},
    { _id: 1, title: 1 }
  );

  const handleFormSubmit: AddGroupFormProps["onFormSubmit"] = async (group) => {
    groupsCollection
      .insertOne({
        title: group.title,
        userId: user._id,
        // userId: "6348434c082a12f8367e27f9",
        // userId: "63499d743872b36cbc0dcd81",
      })
      .then((res) => message.success("Group added!"))
      .catch((err) => message.error(err.message));
  };

  const handleRemoveTodo = (todo: ToDo): void => {
    message.warn("Todo removed!");
  };

  const handleToggleTodoStatus = (todo: ToDo): void => {
    message.info("Todo state updated!");
  };

  const onGroupPress = (groupId: string) => {
    router.go(TODOS, { params: { id: groupId } });
  };

  return (
    <>
      <HeaderTitle title="😆 AMAZING TO DO LIST 😆" />
      <br />
      <Row justify="center">
        <Col span={18}>
          <Card title="Create a new group">
            <AddGroupForm onFormSubmit={handleFormSubmit} />
          </Card>
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
          <Card title="Groups List">
            {isLoading ? (
              <Spinner spinning tip={"Loading groups"} />
            ) : (
              <GroupsList
                groups={data as Group[]}
                onGroupPress={onGroupPress}
              />
            )}
          </Card>
        </Col>
      </Row>
      );
    </>
  );
};
