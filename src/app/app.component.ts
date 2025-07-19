import { Component } from '@angular/core';
import { TasksListComponent } from './features/task/tasks-list/tasks-list.component';
import { QuoteComponent } from './features/quote/quote.component';
import { TaskFormComponent } from './features/task/task-form/task-form.component';
import { GoalListComponent } from './features/goal/goal-list/goal-list.component';
import { GoalFormComponent } from './features/goal/goal-form/goal-form.component';

@Component({
  selector: 'app-root',
  imports: [
    TasksListComponent, 
    QuoteComponent, 
    TaskFormComponent,
    GoalListComponent,
    GoalFormComponent
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
