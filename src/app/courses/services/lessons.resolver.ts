import {inject} from '@angular/core';
import {ResolveFn} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {firstValueFrom} from 'rxjs';
import {LessonsResponse, LessonSummary} from '../model/lesson-summary';

export const lessonsResolver: ResolveFn<LessonSummary[]> = async (route) => {
  const http = inject(HttpClient);
  const courseUrl = route.paramMap.get('courseUrl');
  const res = await firstValueFrom(
    http.get<LessonsResponse>('/api/lessons', {params: {pageSize: '10000', courseUrl}})
  );
  return res.payload;
};
