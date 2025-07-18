import { FormControl } from "@angular/forms";
import { TaskCategory } from "../enums/task-category";
import { TaskPriority } from "../enums/task-priority";
import { TaskFrequency } from "../enums/task-frequency";

export interface TaskFormControls {
  title: FormControl<string | null>,
  category: FormControl<TaskCategory | null>,
  priority: FormControl<TaskPriority | null>,
  frequency: FormControl<TaskFrequency | null>,
  description: FormControl<string | null>,
  goalId: FormControl<string | null>,
  dueDate: FormControl<Date | null>

}
