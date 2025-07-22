import { Component, effect, inject, input } from '@angular/core';
import { Goal } from '../../../core/models/goal.model';
import { Task } from '../../../core/models/task.model';
import { GoalService } from '../../../core/services/goal.service';
import { TaskService } from '../../../core/services/task.service';

@Component({
  selector: 'app-goal-details',
  imports: [],
  templateUrl: './goal-details.component.html',
  styleUrl: './goal-details.component.scss'
})
export class GoalDetailsComponent {
  id = input<string>();
  goal?: Goal;
  tasks?: Task[];
  private goalService = inject(GoalService);
  private taskService = inject(TaskService);


  constructor() {
    effect(() => {
      const idGoal = this.id();

      if (idGoal) {
        this.goal = this.goalService.getGoalById(idGoal);
        this.tasks = this.goal?.listIdTasks?.map(id => this.findTask(id))
          .filter((task): task is Task => task !== undefined);
      } return this.goal
    })
  }

  findTask(idTask: string): Task | undefined {
    return this.taskService.getTaskById(idTask);
  }
}
