import { TaskCategory } from "../enums/task-category";

/**
 *  Interface about Goal 
 *  
 */

export interface Goal {
  id: string
  title: string,
  isCompleted: boolean
  targetCount: number,
  createdAt: Date,
  category: TaskCategory, // exclude Daily from an enum
  dueDate: Date,
  updatedAt?: Date,
  description?: string,
  listIdTasks?: string[]
}


