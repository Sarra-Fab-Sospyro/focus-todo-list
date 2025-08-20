import { computed, Injectable, Signal, signal } from '@angular/core';
import { TaskCategory } from '../enums/task-category';
import { Goal } from '../models/goal.model';

@Injectable({
  providedIn: 'root'
})
export class GoalService {

  private listGoals = signal<Goal[]>([
    {
      id: 'goal1',
      title: 'Push on gitHub the Project',
      createdAt: new Date(),
      category: TaskCategory.GOAL,
      dueDate: new Date(),
      isCompleted: false,
      targetCount: 20,
      description: 'End the client side of Focus APP "onFocus"',
      listIdTasks: ['task1', 'task2']
    },
    {
      id: 'goal2',
      title: 'Go to concert',
      createdAt: new Date(),
      category: TaskCategory.PERSONAL,
      dueDate: new Date('07/28/2026'),
      isCompleted: false,
      targetCount: 0,
    },
    {
      id: 'goal3',
      title: 'Deploy project ',
      createdAt: new Date(),
      category: TaskCategory.WORK,
      dueDate: new Date(),
      isCompleted: false,
      targetCount: 0,
      description: 'Deploy Focus APP "onFocus"',
      listIdTasks: ['task1', 'task2']
    },
  ]);

  completedGoals = computed(() => this.listGoals().filter(goal => goal.isCompleted));

  pendingGoals = computed(() => this.listGoals().filter(goal => !goal.isCompleted));

  goalsByCategory = computed(() => {
    const goals = this.listGoals();
    return {
      [TaskCategory.GOAL]: goals.filter(goal => goal.category === TaskCategory.GOAL),
      [TaskCategory.HABIT]: goals.filter(goal => goal.category === TaskCategory.HABIT),
      [TaskCategory.PERSONAL]: goals.filter(goal => goal.category === TaskCategory.PERSONAL),
      [TaskCategory.WORK]: goals.filter(goal => goal.category === TaskCategory.WORK),
    }
  });

  setGoalList(listGoals: Goal[]) {
    this.listGoals.set(listGoals);
  };

  getGoalist(): Signal<Goal[]> {
    return this.listGoals.asReadonly();
  };

  getGoalById(id: string) {
    return this.listGoals().find(goal => goal.id === id);
  };

  toggleGoalCompleteStatus(goalId: string) {
    this.listGoals.update(goals => goals.map(goal => goal.id === goalId ?
      { ...goal, isCompleted: !goal.isCompleted }
      : goal))
  };

  addGoal(newGoalData: Omit<Goal, 'id' | 'createdAt' | 'isCompleted'>): void {
    const newGoal = {
      ...newGoalData,
      id: this.generateGoalId(),
      createdAt: new Date(),
      isCompleted: false
    }
    this.listGoals.update(goals => [...goals, newGoal]);
  };


  updateGoal(id: string, goalUpdate: Partial<Omit<Goal, 'id' | 'createdAt' | 'isCompleted'>>): void {
    this.listGoals.update((list) => list.map(
      goal => goal.id === id
        ? { ...goal, ...goalUpdate, updateGoal: new Date() } : goal
    ))
  };

  delete(id: string) {
    this.listGoals.update((list) => list.filter(goal => goal.id !== id));
  };

  private generateGoalId(): string {
    const goals = this.listGoals();
    const maxId = goals
      .map(goal => {
        const goalId = goal.id.replace('goal', '')
        return parseInt(goalId, 10)
      })
      .filter(id => !isNaN(id))
      .reduce((max, current) => Math.max(max, current), 0);

    return `goal${maxId + 1}`;
  };
}
