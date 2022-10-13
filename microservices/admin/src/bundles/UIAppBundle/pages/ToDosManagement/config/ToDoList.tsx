import { Service } from "@bluelibs/core";
import { QueryBodyType } from "@bluelibs/x-ui";
import { ToDo } from "@bundles/UIAppBundle/collections";
import { ToDoList as BaseToDoList } from "./ToDoList.base";

@Service({ transient: true })
export class ToDoList extends BaseToDoList {
  build() {
    super.build();
    // Perform additional modifications such as updating how a list item renders or add additional ones
  }

  static getRequestBody(): QueryBodyType<ToDo> {
    // You have the ability to modify the request by adding certain fields or relations

    return super.getRequestBody();
  }
}
