import { TaskFrequency } from "../enums/task-frequency";
import { Task } from "./task.model";

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
  frequencyGoal: Exclude<TaskFrequency, TaskFrequency.DAILY>, // exclude Daily from an enum
  updatedAt?: Date,
  description?: string,
  listTasks?: Task[]
}


