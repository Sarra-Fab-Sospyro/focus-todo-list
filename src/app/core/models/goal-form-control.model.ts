import { FormArray, FormControl } from "@angular/forms";
import { TaskCategory } from "../enums/task-category";

export interface GoalFormControl {
  title: FormControl<string | null>,
  category: FormControl<TaskCategory | null>,
  description: FormControl<string | null>,
  targetedCount: FormControl<string | null>
  dueDate: FormControl<Date | null>
  listTasks?: FormControl<string[] | null>
  isCompleted?: FormControl<boolean | null>
}
