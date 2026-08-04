import {Routes} from '@angular/router';
import {authGuardChild} from '../services/auth.guard';
import {canMatchAuth} from '../services/can-load-auth.guard';
import {featureFlagGuard} from '../services/feature-flag.guard';
import {courseResolver} from './services/course.resolver';
import {lessonsResolver} from './services/lessons.resolver';
import {lessonDetailResolver} from './services/lesson-detail.resolver';
import {LessonProgressService} from './services/lesson-progress.service';

export const coursesRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'edit-course/:courseUrl',
    loadComponent: () => import('./course-edit/course-edit.component').then(m => m.CourseEditComponent),
    resolve: {
      course: courseResolver
    }
  },
  {
    path: ':courseUrl',
    loadComponent: () => import('./course/course.component').then(m => m.CourseComponent),
    resolve: {
      course: courseResolver
    },
    children: [
      {
        path: '',
        loadComponent: () => import('./lessons-list/lessons-list.component').then(m => m.LessonsListComponent),
        resolve: {
          lessons: lessonsResolver
        }
      },
      {
        path: 'lessons/:lessonSeqNo',
        loadComponent: () => import('./lesson/lesson-detail.component').then(m => m.LessonDetailComponent),
        resolve: {
          lesson: lessonDetailResolver
        }
      }
    ]
  }
];
