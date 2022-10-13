import { Service } from "@bluelibs/core";
import { QueryBodyType } from "@bluelibs/x-ui";
import { Group } from "@bundles/UIAppBundle/collections";
import { GroupViewer as BaseGroupViewer } from "./GroupViewer.base";

@Service({ transient: true })
export class GroupViewer extends BaseGroupViewer {
  build() {
    super.build();

    // Perform additional modifications such as updating rendering functions, labels, description
  }

  static getRequestBody(): QueryBodyType<Group> {
    // You have the ability to modify the request by adding certain fields or relations

    return super.getRequestBody();
  }
}
