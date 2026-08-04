import {Component, inject, input, OnDestroy} from '@angular/core';
import {RouterLink} from '@angular/router';
import {LessonSummary} from '../model/lesson-summary';
import {LessonProgressService} from '../services/lesson-progress.service';

@Component({
    selector: 'lessons-list',
    templateUrl: './lessons-list.component.html',
    styleUrls: ['./lessons-list.component.css'],
  imports: [
    RouterLink
  ],
})
export class LessonsListComponent implements OnDestroy {
    readonly lessons = input<LessonSummary[]>([]);
    protected readonly progress = inject(LessonProgressService);

    constructor() {
        console.log('[LessonsList] created');
    }

    ngOnDestroy() {
        console.log('[LessonsList] destroyed');
    }
}
