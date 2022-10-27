import { Group } from "@root/api.types";
import React, { useEffect, useState } from "react";
import { ReactSortable } from "react-sortablejs";
import { GroupItem } from "..";

import "./GroupsList.scss";

interface Props {
  groups: Group[];
  onGroupPress(groupId: string): void;
  onGroupDelete(groupId: string): Promise<void>;
  onGroupEdit(groupId: string, title: string): Promise<void>;
}

const GroupsList: React.FC<Props> = ({
  groups,
  onGroupPress,
  onGroupDelete,
  onGroupEdit,
}) => {
  const [groupsList, setGroupsList] = useState(
    groups.map((group) => ({ ...group, id: group._id }))
  );

  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    setGroupsList(groups.map((group) => ({ ...group, id: group._id })));
  }, [groups]);

  return (
    <>
      <ReactSortable
        list={groupsList}
        setList={setGroupsList}
        className="grid-container"
        ghostClass="group-drop-area"
        handle=".drag-handle"
        animation={200}
        onChoose={() => setIsDragging(true)}
        onUnchoose={() => setIsDragging(false)}
      >
        {groupsList.map((item) => (
          <GroupItem
            key={item.id}
            onPress={() => onGroupPress(item._id.toString())}
            onDelete={() => onGroupDelete(item._id)}
            onEdit={(title) => onGroupEdit(item._id, title)}
            hoverable={!isDragging}
            group={item}
          />
        ))}
      </ReactSortable>
    </>
  );
};

export default GroupsList;
