import {Component, input, output} from '@angular/core';
import {Course} from '../model/course';
import {RouterLink} from '@angular/router';

@Component({
    selector: 'courses-card-list',
    templateUrl: './courses-card-list.component.html',
    styleUrls: ['./courses-card-list.component.css'],
  imports: [
    RouterLink
  ],
})
export class CoursesCardListComponent {
    readonly courses = input<Course[]>([]);
    readonly coursesChanged = output();
}
