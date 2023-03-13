import { Component, OnInit } from '@angular/core';
import { Course } from '../model/course';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'

import { CoursesService } from '../services/courses.service';
import { sortCoursesBySeqNo } from '../model/course'
import { LoadingService } from '../loading/loading.service';


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  beginnerCourses$: Observable<Course[]>;
  advancedCourses$: Observable<Course[]>;


  constructor(private coursesService: CoursesService,
              private loadingService: LoadingService) {}


  ngOnInit() {
    this.getAllCourses()
  }


  /* ================ GET ALL COURSES ================ */
  getAllCourses(){

    const courses$ = this.coursesService.loadAllCourses()
      .pipe(
        map(value => value.sort(sortCoursesBySeqNo)),
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




