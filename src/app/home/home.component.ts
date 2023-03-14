import { Component, OnInit } from '@angular/core';
import { Course } from '../model/course';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators'

import { CoursesService } from '../services/courses.service';
import { sortCoursesBySeqNo } from '../model/course'
import { LoadingService } from '../loading/loading.service';
import { MessageService } from '../messages/message.service';


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  beginnerCourses$: Observable<Course[]>;
  advancedCourses$: Observable<Course[]>;


  constructor(private coursesService: CoursesService,
              private loadingService: LoadingService,
              private messageService: MessageService) {}


  ngOnInit() {
    this.getAllCourses()
  }


  /* ================ GET ALL COURSES ================ */
  getAllCourses(){

    const courses$ = this.coursesService.loadAllCourses()
      .pipe(
        map(value => value.sort(sortCoursesBySeqNo)),
        catchError(err => {
          const message = 'Could not load courses';
          this.messageService.showErrors(message);
          console.log(message, err);
          return throwError(err);
        })
      );

    let loadCourses$ = this.loadingService.showLoaderUntilCompleted(courses$);

    this.beginnerCourses$ = loadCourses$.pipe(
      map(course => course.filter(value => value.category = 'BEGINNER'))
    )

    this.advancedCourses$ = loadCourses$.pipe(
      map(course => course.filter(value => value.category = 'ADVANCED'))
    )
  }



 






 



}




