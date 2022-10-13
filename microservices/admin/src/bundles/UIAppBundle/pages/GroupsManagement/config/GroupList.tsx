import { Service } from "@bluelibs/core";
import { QueryBodyType } from "@bluelibs/x-ui";
import { Group } from "@bundles/UIAppBundle/collections";
import { GroupList as BaseGroupList } from "./GroupList.base";

@Service({ transient: true })
export class GroupList extends BaseGroupList {
  build() {
    super.build();
    // Perform additional modifications such as updating how a list item renders or add additional ones
  }

  static getRequestBody(): QueryBodyType<Group> {
    // You have the ability to modify the request by adding certain fields or relations

    return super.getRequestBody();
  }
}
