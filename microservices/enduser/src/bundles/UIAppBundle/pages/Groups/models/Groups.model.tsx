import { Inject } from "@bluelibs/core";
import { Smart } from "@bluelibs/smart";
import { GuardianSmart } from "@bluelibs/x-ui";
import { GroupsCollection } from "@bundles/UIAppBundle/collections";
import { Group } from "@root/api.types";
import * as React from "react";

interface IState {
  groups: Group[];
  loading: boolean;
  error: string;
  message: string;
}

const initialState: IState = {
  groups: [],
  loading: false,
  message: "",
  error: "",
};

const GroupsContext = React.createContext(null);

export default class GroupsModel extends Smart<IState> {
  state: IState = { ...initialState };

  @Inject()
  groupsCollection: GroupsCollection;

  @Inject()
  guardian: GuardianSmart;

  static getContext = () => GroupsContext;

  public async fetchGroups(): Promise<void> {
    if (!this.guardian.state.initialised) return;

    const { user } = this.guardian.state;

    this.updateState({ loading: true });

    const groups = await this.groupsCollection.find(
      {
        filters: { userId: user._id },
      },
      { _id: 1, title: 1 }
    );

    this.updateState({ loading: false, groups });
  }

  public async createGroup(group: Partial<Group>): Promise<void> {
    const { user } = this.guardian.state;

    const insertedGroup = await this.groupsCollection.insertOne({
      title: group.title,
      userId: user._id,
    });

    this.updateState({
      groups: [...this.state.groups, insertedGroup as Group],
    });
  }
}
