import { Service } from "@bluelibs/core";
import { GroupEditForm as BaseGroupEditForm } from "./GroupEditForm.base";
import { QueryBodyType } from "@bluelibs/x-ui";
import { Group } from "@bundles/UIAppBundle/collections";

@Service({ transient: true })
export class GroupEditForm extends BaseGroupEditForm {
  build() {
    super.build();

    // Perform additional modifications such as updating rendering functions, labels, description
  }

  static getRequestBody(): QueryBodyType<Group> {
    // You have the ability to modify the request by adding certain fields or relations

    return super.getRequestBody();
  }
}
