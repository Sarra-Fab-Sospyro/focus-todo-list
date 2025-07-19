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
  createdAt: Date,
  updatedAt?: Date,
  goalId?: string,
  dueDate?: Date
}
