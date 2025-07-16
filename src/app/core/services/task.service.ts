import { computed, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { Task } from '../models/task.model';
import { TaskCategory } from '../enums/task-category';
import { TaskPriority } from '../enums/task-priority';
import { TaskFrequency } from '../enums/task-frequency';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private listTask = signal<Task[]>([
    {
      id: 'task1',
      title: 'Write the task list',
      isCompleted: false,
      category: TaskCategory.GOAL,
      priority: TaskPriority.HIGH,
      frequency: TaskFrequency.ONE_TIME,
      createdAt: new Date()
    },
    {
      id: 'task2',
      title: 'Write the goal list',
      isCompleted: false,
      category: TaskCategory.GOAL,
      priority: TaskPriority.HIGH,
      frequency: TaskFrequency.ONE_TIME,
      createdAt: new Date()
    },
    {
      id: 'task3',
      title: '10 push-up',
      isCompleted: false,
      category: TaskCategory.HABIT,
      priority: TaskPriority.MEDIUM,
      frequency: TaskFrequency.DAILY,
      createdAt: new Date()
    },
    {
      id: 'task4',
      title: '10 squat',
      isCompleted: false,
      category: TaskCategory.HABIT,
      priority: TaskPriority.MEDIUM,
      frequency: TaskFrequency.DAILY,
      createdAt: new Date()
    },
  ]);


  completedTasks = computed(() => this.listTask().filter(task => task.isCompleted));

  pendingTasks = computed(() => this.listTask().filter(task => !task.isCompleted));

  tasksByCategory = computed(() => {
    const tasks = this.listTask();
    return {
      [TaskCategory.GOAL]: tasks.filter(task => task.category === TaskCategory.GOAL),
      [TaskCategory.HABIT]: tasks.filter(task => task.category === TaskCategory.HABIT),
      [TaskCategory.GENERAL]: tasks.filter(task => task.category === TaskCategory.GENERAL),
      [TaskCategory.PERSONAL]: tasks.filter(task => task.category === TaskCategory.PERSONAL),
    }
  })

  constructor() { }

  setTaskList(listTask: Task[]) {
    this.listTask.set(listTask);
  }

  getTaskList(): Signal<Task[]> {
    return this.listTask.asReadonly();
  }

  updateTaskList(listTask: Task[]) {
    this.listTask.update((currentTasks) => currentTasks = listTask);
  }

  toggleTaskCompleteStaus(taskId: string) {
    this.listTask.update(tasks => tasks.map(task => task.id === taskId ?
      { ...task, isCompleted: !task.isCompleted }
      : task))
  }

}
