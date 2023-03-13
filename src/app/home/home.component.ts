import { Component, OnInit } from '@angular/core';
import { Course } from '../model/course';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'

import { CoursesService } from '../services/courses.service';
import { sortCoursesBySeqNo } from '../model/course'


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  beginnerCourses$: Observable<Course[]>;
  advancedCourses$: Observable<Course[]>;


  constructor(private coursesService: CoursesService) {}


  ngOnInit() {
    this.getAllCourses()
  }


  /* ================ GET ALL COURSES ================ */
  getAllCourses(){
    const courses$ = this.coursesService.loadAllCourses()
      .pipe(
        map(value => value.sort(sortCoursesBySeqNo))
      );
 
      this.beginnerCourses$ = courses$.pipe(
        map(course => course.filter(value => value.category = 'BEGINNER'))
      )

      this.advancedCourses$ = courses$.pipe(
        map(course => course.filter(value => value.category = 'ADVANCED'))
      )
  }



 






 



}




