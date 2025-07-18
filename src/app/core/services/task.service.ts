import { computed, Injectable, Signal, signal } from '@angular/core';
import { TaskCategory } from '../enums/task-category';
import { TaskFrequency } from '../enums/task-frequency';
import { TaskPriority } from '../enums/task-priority';
import { Task } from '../models/task.model';

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
  });

  constructor() { }

  setTaskList(listTask: Task[]) {
    this.listTask.set(listTask);
  };

  getTaskList(): Signal<Task[]> {
    return this.listTask.asReadonly();
  };


  toggleTaskCompleteStaus(taskId: string) {
    this.listTask.update(tasks => tasks.map(task => task.id === taskId ?
      { ...task, isCompleted: !task.isCompleted }
      : task))
  };

  addTask(newTaskData: Omit<Task, 'id' | 'createdAt' | 'isCompleted'>): void {
    const newTask = {
      ...newTaskData,
      id: this.generateTaskId(),
      createdAt: new Date(),
      isCompleted: false
    }
    this.listTask.update((tasks) => [...tasks, newTask]);
  };

  deleteTask(id: string) {
    this.listTask.update((list) => list.filter(task => task.id !== id));
  };

  updateTask(id: string, taskUpdated: Partial<Omit<Task, 'id' | 'createdAt'>>): void {
    this.listTask.update((list) => list.map(
      task => task.id === id ? { ...task, ...taskUpdated, updatedAt: new Date() } : task
    ))
  };

  getTaskById(id: string): Task | undefined {
    return this.listTask().find(task => task.id === id);
  };

  // method to generate id, incrementing by one from the highest number 
  private generateTaskId(): string {
    const tasks = this.listTask();
    const maxId = tasks
      .map(task => {
        const taskId = task.id.replace('task', '')
        return parseInt(taskId, 10)
      })
      .filter(id => !isNaN(id))
      .reduce((max, current) => Math.max(max, current), 0)

    return `task${maxId + 1}`;
  };

}
