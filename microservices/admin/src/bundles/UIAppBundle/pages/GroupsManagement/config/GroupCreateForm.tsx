import { Service } from "@bluelibs/core";
import { GroupCreateForm as BaseGroupCreateForm } from "./GroupCreateForm.base";

@Service({ transient: true })
export class GroupCreateForm extends BaseGroupCreateForm {
  build() {
    super.build();

    // Perform additional modifications such as updating rendering functions, labels, description
  }
}
