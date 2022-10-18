import { Group } from "@root/api.types";
import React, { useState } from "react";
import { ReactSortable } from "react-sortablejs";
import { GroupItem } from "..";
import "./GroupsList.scss";

interface Props {
  groups: Group[];
  onGroupPress(groupId: string): void;
}

const GroupsList: React.FC<Props> = ({ groups, onGroupPress }) => {
  const [groupsList, setGroupsList] = useState(
    groups.map((group) => ({ ...group, id: group._id }))
  );

  const [isDragging, setIsDragging] = useState(false);

  const onSortDone = ({ oldIndex, newIndex }) => {
    // JUST FOR TESTING :)
    // SORTABLE LIST IS ONLY IMPLEMENTED IN THE TODO LIST
    console.log(`${oldIndex} => ${newIndex}`);
  };

  return (
    <>
      <ReactSortable
        list={groupsList}
        setList={setGroupsList}
        onSort={onSortDone}
        className="grid-container"
        ghostClass="dropArea"
        handle=".dragHandle"
        animation={200}
        onChoose={() => setIsDragging(true)}
        onUnchoose={() => setIsDragging(false)}
      >
        {groupsList.map((item) => (
          <GroupItem
            key={item.id}
            onPress={() => onGroupPress(item._id.toString())}
            hoverable={!isDragging}
            group={item}
          />
        ))}
      </ReactSortable>
    </>
  );
};

export default GroupsList;
