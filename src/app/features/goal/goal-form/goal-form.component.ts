import { Component, effect, inject, input, model, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskCategory } from '../../../core/enums/task-category';
import { GoalService } from '../../../core/services/goal.service';
import { GoalFormControl } from '../../../core/models/goal-form-control.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-goal-form',
  imports: [ReactiveFormsModule],
  templateUrl: './goal-form.component.html',
  styleUrl: './goal-form.component.scss'
})
export class GoalFormComponent {

  id = input<string>();
  returnUrl = input<string>('/goals');

  formGoal!: FormGroup;
  isUpdatedMode = signal<boolean>(false);
  categories = Object.values(TaskCategory);

  private fb = inject(FormBuilder);
  private goalService = inject(GoalService);
  private router = inject(Router);

  constructor() {
    this.initForm();

    effect(() => {
      const idGoal = this.id();
      if (idGoal) {
        this.isUpdatedMode.set(true);
        this.loadGoalsForUpdate(idGoal);
      } else {
        this.isUpdatedMode.set(false);
      }
    })
  };

  onSubmit() {
    if (this.formGoal.invalid) {
      return
    }

    if (this.isUpdatedMode()) {
      const idGoal = this.id()
      if (idGoal) {
        const goalUpdated = {
          ...this.formGoal.value,
          updatedAt: new Date()
        }
        this.goalService.updateGoal(idGoal, goalUpdated);
      }
    } else {
      this.goalService.addGoal(this.formGoal.value);
    }
    this.resetForm()
    this.router.navigate([this.returnUrl() || '/goals']);

  };

  onCancel() {
    this.resetForm()
  };

  private resetForm() {
    this.formGoal.removeControl('isCompleted')
    this.formGoal.reset();
  };

  private initForm() {
    this.formGoal = this.fb.group<GoalFormControl>({
      title: this.fb.control('', [Validators.required]),
      category: this.fb.control(null, [Validators.required]),
      description: this.fb.control('', [Validators.maxLength(1000)]),
      targetedCount: this.fb.control(null, [Validators.max(100), Validators.min(0)]),
      dueDate: this.fb.control(null, [Validators.required])
    })
  };

  private loadGoalsForUpdate(goalId: string) {
    const goal = this.goalService.getGoalById(goalId);

    if (goal) {

      this.formGoal.addControl(
        'isCompleted',
        this.fb.control(goal.isCompleted ?? false)
      );

      this.formGoal.patchValue({
        title: goal.title,
        category: goal.category,
        description: goal.description,
        targetedCount: goal.targetCount,
        dueDate: goal.dueDate,
      });
    }
  }

}
