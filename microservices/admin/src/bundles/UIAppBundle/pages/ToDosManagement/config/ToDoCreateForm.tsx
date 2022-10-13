import { Service } from "@bluelibs/core";
import { ToDoCreateForm as BaseToDoCreateForm } from "./ToDoCreateForm.base";

@Service({ transient: true })
export class ToDoCreateForm extends BaseToDoCreateForm {
  build() {
    super.build();

    // Perform additional modifications such as updating rendering functions, labels, description
  }
}
