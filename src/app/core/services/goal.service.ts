import { computed, Injectable, Signal, signal } from '@angular/core';
import { Goal } from '../models/goal.model';
import { TaskFrequency } from '../enums/task-frequency';

@Injectable({
  providedIn: 'root'
})
export class GoalService {

  private listGoals = signal<Goal[]>([
    {
      id: 'goal1',
      title: 'Push on gitHub the Project',
      createdAt: new Date(),
      frequencyGoal: TaskFrequency.WEEKLY,
      isCompleted: false,
      targetCount: 20,
      description: 'End the client side of Focus APP "onFocus"',
      listIdTasks: ['task1', 'task2']
    },
    {
      id: 'goal2',
      title: 'Go to concert',
      createdAt: new Date(),
      frequencyGoal: TaskFrequency.ANNUAL,
      isCompleted: false,
      targetCount: 0,
    },
    {
      id: 'goal3',
      title: 'Deploy project ',
      createdAt: new Date(),
      frequencyGoal: TaskFrequency.MONTHLY,
      isCompleted: false,
      targetCount: 0,
      description: 'Deploy Focus APP "onFocus"',
      listIdTasks: ['task1', 'task2']
    },
  ]);

  completedGoals = computed(() => this.listGoals().filter(goal => goal.isCompleted));

  pendingGoals = computed(() => this.listGoals().filter(goal => !goal.isCompleted));

  goalsByFrequency = computed(() => {
    const goals = this.listGoals();
    return {
      [TaskFrequency.ANNUAL]: goals.filter(goal => goal.frequencyGoal === TaskFrequency.ANNUAL),
      [TaskFrequency.MONTHLY]: goals.filter(goal => goal.frequencyGoal === TaskFrequency.MONTHLY),
      [TaskFrequency.WEEKLY]: goals.filter(goal => goal.frequencyGoal === TaskFrequency.WEEKLY),
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


  updateGoal(id: string, goalUpdate: Partial<Omit<Goal, 'id' | 'createdAt'>>): void {
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
