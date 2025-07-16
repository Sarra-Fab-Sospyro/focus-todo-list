import { TaskCategory } from "../enums/task-category";
import { TaskFrequency } from "../enums/task-frequency";
import { TaskPriority } from "../enums/task-priority";

/**
 *  Interface about single task
 *  
 */
export interface Task {
  id: string
  title: string,
  isCompleted: boolean,
  category: TaskCategory,
  priority: TaskPriority,
  frequency: TaskFrequency,
  createdAt: Date,
  updatedAt?: Date,
  description?: string
  goalId?: string,
  dueDate?: Date
}
