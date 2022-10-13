import { Service } from "@bluelibs/core";
import { ToDoListFiltersForm as BaseToDoListFiltersForm } from "./ToDoListFiltersForm.base";

@Service({ transient: true })
export class ToDoListFiltersForm extends BaseToDoListFiltersForm {
  build() {
    super.build();

    // Perform additional modifications such as updating rendering functions, labels, description
  }
}
