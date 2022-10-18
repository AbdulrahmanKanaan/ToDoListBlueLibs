import { DragOutlined, EditOutlined } from "@ant-design/icons";
import { Group } from "@root/api.types";
import { Card } from "antd";
import React from "react";

interface Props {
  group: Group;
  onPress: any;
  hoverable: boolean;
}

const GroupItem: React.FunctionComponent<Props> = ({
  group,
  onPress,
  hoverable,
}) => {
  return (
    <>
      <Card
        onClick={onPress}
        hoverable={hoverable}
        actions={[
          // <EyeOutlined key="view" onClick={onPress} />,
          <EditOutlined key="edit" />,
          <DragOutlined key="drag" className="dragHandle" />,
        ]}
        bodyStyle={{ flexGrow: 1 }}
        style={{ display: "flex", flexDirection: "column" }}
      >
        {group.title}
      </Card>
    </>
  );
};

export default GroupItem;
