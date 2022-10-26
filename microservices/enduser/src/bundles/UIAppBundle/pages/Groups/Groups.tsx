import React, { useEffect } from "react";

import { newSmart, smart, useRouter } from "@bluelibs/x-ui";
import { HeaderTitle, Layout, Spinner } from "@bundles/UIAppBundle/components";
import { Card, message, Space } from "antd";
import { TODOS } from "../routes";
import { AddGroupForm, GroupsList } from "./components";
import { GroupsModel } from "./models";

type AddGroupFormProps = React.ComponentProps<typeof AddGroupForm>;

const Groups: React.FunctionComponent<any> = (props) => {
  const router = useRouter();

  const [api] = newSmart(GroupsModel);

  const { loading, groups } = api.state;

  const handleFormSubmit: AddGroupFormProps["onFormSubmit"] = async (group) => {
    api
      .createGroup(group)
      .then(() => message.success("Group added!"))
      .catch((err) => message.error(err.message));
  };

  const onGroupPress = (groupId: string) => {
    router.go(TODOS, { params: { id: groupId } });
  };

  useEffect(() => {
    api.fetchGroups();
  }, [api]);

  // const groupsCollection = use(GroupsCollection);

  // const {
  //   state: { user },
  // } = useAppGuardian();

  // const { data, error, isLoading } = useData(
  //   GroupsCollection,
  //   {},
  //   { _id: 1, title: 1 }
  // );

  return (
    <>
      <Layout>
        <Space direction="vertical" style={{ width: "100%" }} size="large">
          <HeaderTitle title="😆 AMAZING TO DO LIST 😆" />
          <Card title="Create a new group">
            <AddGroupForm onFormSubmit={handleFormSubmit} />
          </Card>
          <Card title="Groups List">
            {loading ? (
              <Spinner spinning tip={"Loading groups"} />
            ) : (
              <GroupsList groups={groups} onGroupPress={onGroupPress} />
            )}
          </Card>
        </Space>
      </Layout>
    </>
  );
};

export default smart(GroupsModel)(Groups);
