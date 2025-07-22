import { Component, input } from '@angular/core';
import { GoalListComponent } from '../goal/goal-list/goal-list.component';
import { QuoteComponent } from '../quote/quote.component';
import { TasksListComponent } from '../task/tasks-list/tasks-list.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    QuoteComponent,
    TasksListComponent,
    GoalListComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  quote = input<{ author: string, body: string }>();
 
  idGoal!: string;
  idTask!: string;

  // idTaskSelected(idEvent: string) {
  //   this.idTask = idEvent;
  // }
  // idGoalSelected(idEvent: string) {
  //   this.idGoal = idEvent;
  // }

}
