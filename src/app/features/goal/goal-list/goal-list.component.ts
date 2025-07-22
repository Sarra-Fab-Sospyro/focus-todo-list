import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { TaskCategory } from '../../../core/enums/task-category';
import { CompletedPipe } from '../../../core/pipes/completed.pipe';
import { GoalService } from '../../../core/services/goal.service';

type GoalFilter = TaskCategory | 'all';

@Component({
  selector: 'app-goal-list',
  imports: [CompletedPipe],
  templateUrl: './goal-list.component.html',
  styleUrl: './goal-list.component.scss'
})
export class GoalListComponent {


  currentFilter = signal<string>('all');
  listGoals = computed(() => {
    const allGoals = this.listAllGoals();
    const filter = this.currentFilter();

    if (filter === 'all') {
      return allGoals;
    }
    const filterdGoals = allGoals.filter(goal => goal.category === filter)
    return filterdGoals;

  })

  protected readonly filtersGoal: GoalFilter[] = [
    'all',
    ...Object.values(TaskCategory)
  ];

  private router = inject(Router);
  private goalService = inject(GoalService);
  private listAllGoals = this.goalService.getGoalist();


  onFilterChange(filterType: GoalFilter) {
    this.currentFilter.set(filterType);
  };

  toggleGoalStatus(id: string) {
    this.goalService.toggleGoalCompleteStatus(id);
  };

  selectGoal(id: string) {
    this.router.navigate([`goals/${id}`]);
    console.log(`id goal: ${id}`);
  };

  updateGoal(id: string) {
    this.router.navigate([`goals/${id}/edit`], {
      queryParams: { returnUrl: this.router.url }
    });
  };

  deleteGoal(id: string) {
    this.goalService.delete(id);
  };
}
