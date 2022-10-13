import { Service } from "@bluelibs/core";
import { ToDoEditForm as BaseToDoEditForm } from "./ToDoEditForm.base";
import { QueryBodyType } from "@bluelibs/x-ui";
import { ToDo } from "@bundles/UIAppBundle/collections";

@Service({ transient: true })
export class ToDoEditForm extends BaseToDoEditForm {
  build() {
    super.build();

    // Perform additional modifications such as updating rendering functions, labels, description
  }

  static getRequestBody(): QueryBodyType<ToDo> {
    // You have the ability to modify the request by adding certain fields or relations

    return super.getRequestBody();
  }
}
