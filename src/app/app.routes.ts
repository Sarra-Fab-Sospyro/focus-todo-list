import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { TasksListComponent } from './features/task/tasks-list/tasks-list.component';
import { TaskDetailsComponent } from './features/task/task-details/task-details.component';
import { GoalListComponent } from './features/goal/goal-list/goal-list.component';
import { GoalDetailsComponent } from './features/goal/goal-details/goal-details.component';
import { TaskFormComponent } from './features/task/task-form/task-form.component';
import { GoalFormComponent } from './features/goal/goal-form/goal-form.component';
import { quoteResolver } from './core/resolvers/quote.resolver';

export const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    resolve: {
      quote: quoteResolver
    }
  },

  //FEATURE
  { path: 'tasks', component: TasksListComponent, },
  { path: 'tasks/new', component: TaskFormComponent },
  { path: 'tasks/:id', component: TaskDetailsComponent },
  { path: 'tasks/:id/edit', component: TaskFormComponent },
  { path: 'goals', component: GoalListComponent },
  { path: 'goals/new', component: GoalFormComponent },
  { path: 'goals/:id', component: GoalDetailsComponent },
  { path: 'goals/:id/edit', component: GoalFormComponent },

  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  }
];
