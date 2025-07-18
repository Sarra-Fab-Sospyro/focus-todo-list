import { FormArray, FormControl } from "@angular/forms";
import { TaskCategory } from "../enums/task-category";
import { TaskPriority } from "../enums/task-priority";

export interface TaskFormControls {
  title: FormControl<string | null>,
  category: FormControl<TaskCategory | null>,
  priority: FormControl<TaskPriority | null>,
  goalId: FormControl<string | null>,
  isCompleted?: FormControl<boolean | null>

}
