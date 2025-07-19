import { Component } from '@angular/core';
import { TasksListComponent } from './features/task/tasks-list/tasks-list.component';
import { QuoteComponent } from './features/quote/quote.component';
import { TaskFormComponent } from './features/task/task-form/task-form.component';
import { GoalListComponent } from './features/goal/goal-list/goal-list.component';
import { GoalFormComponent } from './features/goal/goal-form/goal-form.component';
import { TaskDetailsComponent } from './features/task/task-details/task-details.component';
import { GoalDetailsComponent } from './features/goal/goal-details/goal-details.component';

@Component({
  selector: 'app-root',
  imports: [
    TasksListComponent,
    QuoteComponent,
    TaskFormComponent,
    TaskDetailsComponent,
    GoalListComponent,
    GoalFormComponent,
    GoalDetailsComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'focus-todo-list';
  idGoal!: string;
  idTask!: string;

  idTaskSelected(idEvent: string) {
    this.idTask = idEvent;
  }
  idGoalSelected(idEvent: string) {
    this.idGoal = idEvent;
  }
}
