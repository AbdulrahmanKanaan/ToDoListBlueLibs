import { Service } from "@bluelibs/core";
import { QueryBodyType } from "@bluelibs/x-ui";
import { ToDo } from "@bundles/UIAppBundle/collections";
import { ToDoViewer as BaseToDoViewer } from "./ToDoViewer.base";

@Service({ transient: true })
export class ToDoViewer extends BaseToDoViewer {
  build() {
    super.build();

    // Perform additional modifications such as updating rendering functions, labels, description
  }

  static getRequestBody(): QueryBodyType<ToDo> {
    // You have the ability to modify the request by adding certain fields or relations

    return super.getRequestBody();
  }
}
