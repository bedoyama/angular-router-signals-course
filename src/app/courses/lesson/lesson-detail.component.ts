import {Component, effect, inject, input, OnDestroy, Signal} from '@angular/core';
import {ActivatedRoute, Router, RouterLink, ROUTER_OUTLET_DATA} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {LessonDetail} from '../model/lesson-detail';
import {LessonProgressService} from '../services/lesson-progress.service';
import {VideoPlaceholderComponent} from '../../shared/video-placeholder/video-placeholder.component';

@Component({
    selector: 'lesson',
    templateUrl: './lesson-detail.component.html',
    styleUrls: ['./lesson-detail.component.css'],
  imports: [VideoPlaceholderComponent, RouterLink],
})
export class LessonDetailComponent implements OnDestroy {
    private readonly title = inject(Title);
    private readonly progress = inject(LessonProgressService);

    readonly lesson = input<LessonDetail>();
    readonly courseUrl = input<string>();

    constructor() {
        console.log('[LessonDetail] created');
        effect(() => {
            const lesson = this.lesson();
            if (lesson) {
                this.title.setTitle(lesson.description);
                this.progress.markVisited(lesson.seqNo);
            }
        });
    }

    reloadLesson() {}

    ngOnDestroy() {
        console.log('[LessonDetail] destroyed');
    }
}
