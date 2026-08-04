import {Component, computed, effect, inject, input, OnDestroy, signal} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {Course} from '../model/course';
import {LessonProgressService} from '../services/lesson-progress.service';

export type CourseOutletData = {captionsEnabled: boolean};

@Component({
    selector: 'course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.css'],
  imports: [
    RouterLink,
    RouterOutlet
  ],
    providers: [LessonProgressService]
})
export class CourseComponent implements OnDestroy {
    readonly course = input.required<Course>();
    readonly couponCode = input<string>();

    private readonly title = inject(Title);
    protected readonly progress = inject(LessonProgressService);

    protected readonly captionsEnabled = signal(false);
    protected readonly outletData = computed<CourseOutletData>(() => ({
        captionsEnabled: this.captionsEnabled(),
    }));

    protected readonly progressPercent = computed(() =>
        Math.round((this.progress.visitedCount() / this.course().lessonsCount) * 100)
    );

    constructor() {
        console.log('[Course] created');
        effect(() => {
            const course = this.course();
            this.title.setTitle(course.description);
            this.progress.initialize(course.url);
        });
    }

    onActivate(component: unknown) {
        console.log('[Course outlet] activated:', (component as any)?.constructor?.name);
    }

    onDeactivate(component: unknown) {
        console.log('[Course outlet] deactivated:', (component as any)?.constructor?.name);
    }

    ngOnDestroy() {
        console.log('[Course] destroyed');
    }
}
