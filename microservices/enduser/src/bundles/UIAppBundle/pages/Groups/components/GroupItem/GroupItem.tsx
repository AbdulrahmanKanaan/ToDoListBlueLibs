import {
  DeleteOutlined,
  DragOutlined,
  EditOutlined,
  EnterOutlined,
} from "@ant-design/icons";
import { Group } from "@root/api.types";
import { Card, Input, Popconfirm, Typography } from "antd";
import React, { useState } from "react";

interface Props {
  group: Group;
  onPress: any;
  onDelete: any;
  onEdit: any;
  hoverable: boolean;
}

const GroupItem: React.FunctionComponent<Props> = ({
  group,
  onPress,
  onDelete,
  onEdit,
  hoverable,
}) => {
  const [isEdit, setIsEdit] = useState(false);

  return (
    <>
      <Card
        // onClick={onPress}
        hoverable={hoverable}
        actions={[
          // <EyeOutlined key="view" onClick={onPress} />,
          <EditOutlined
            key="edit"
            onClick={() => setIsEdit((oldIsEdit) => !oldIsEdit)}
            style={{ color: "green" }}
          />,
          <Popconfirm
            title="Are you sure to delete this task?"
            onConfirm={onDelete}
            okText="Yes"
            cancelText="No"
          >
            <DeleteOutlined key={"delete"} style={{ color: "red" }} />
          </Popconfirm>,
          <DragOutlined
            key="drag"
            className="drag-handle"
            style={{ color: "blue" }}
          />,
        ]}
        bodyStyle={{ flexGrow: 1 }}
        style={{ display: "flex", flexDirection: "column" }}
      >
        {isEdit ? (
          <>
            <Input.Search
              defaultValue={group.title}
              onSearch={onEdit}
              autoFocus
              enterButton={<EnterOutlined />}
            />
          </>
        ) : (
          <Typography.Text onClick={onPress} style={{ display: "block" }}>
            {group.title}
          </Typography.Text>
        )}
      </Card>
    </>
  );
};

export default GroupItem;
