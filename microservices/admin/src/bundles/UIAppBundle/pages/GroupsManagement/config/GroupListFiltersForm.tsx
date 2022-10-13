import { Service } from "@bluelibs/core";
import { GroupListFiltersForm as BaseGroupListFiltersForm } from "./GroupListFiltersForm.base";

@Service({ transient: true })
export class GroupListFiltersForm extends BaseGroupListFiltersForm {
  build() {
    super.build();

    // Perform additional modifications such as updating rendering functions, labels, description
  }
}
