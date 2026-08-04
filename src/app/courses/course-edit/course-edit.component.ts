import {Component, effect, inject, input, linkedSignal} from '@angular/core';
import {Router} from '@angular/router';
import {form, FormField, required, submit} from '@angular/forms/signals';
import {Course} from '../model/course';
import {CoursesService} from '../services/courses.service';
import {ConfirmRouteExit} from '../../shared/confirm-dialog/confirm-route-exit';

@Component({
  selector: 'course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.css'],
  imports: [FormField],
})
export class CourseEditComponent implements ConfirmRouteExit {
  private readonly coursesService = inject(CoursesService);

  readonly course = input.required<Course>();
  readonly courseUrl = input<string>();
  readonly mode = input<'edit' | 'create'>();

  constructor() {
    effect(() => {
      console.log('Course URL:', this.courseUrl());
      console.log('Mode:', this.mode());
    });
  }

  protected readonly model = linkedSignal(() => ({
    description: this.course().description,
    category: this.course().category,
    longDescription: this.course().longDescription,
  }));

  protected readonly courseForm = form(this.model, (s) => {
    required(s.description, {message: 'Description is required'});
    required(s.category, {message: 'Category is required'});
    required(s.longDescription, {message: 'Long description is required'});
  });

  hasUnsavedChanges() {
    return this.courseForm.description().dirty()
      || this.courseForm.category().dirty()
      || this.courseForm.longDescription().dirty();
  }

  save() {
    submit(this.courseForm, async () => {
      await this.coursesService.saveCourse(this.course().id, this.model());
    });
  }

  cancel() {
  }
}
